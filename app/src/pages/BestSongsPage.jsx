"use strict"

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Page from '../common-layout/Page';
import MainHeading from '../common-layout/MainHeading';
import Card from '../common-layout/Card';
import RaisedButton from '../common-layout/RaisedButton';
import Album from '../album/Album';

class BestSongsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {id: "?", songs: []},
      loaded: false
    }
  }

  componentWillMount() {
    const setState = this.setState.bind(this)
    const { id } = this.props.match.params
    const { pathname, search } = this.props.location
    const req = new XMLHttpRequest()
    req.open("GET", `/api${pathname}${search}`)
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setState({
          loaded: true,
          album: {
            id: id,
            songs: songsWithTitles(JSON.parse(this.responseText))
          }
        })
      }
    }
    req.send()

    function songsWithTitles(titles) {
      return titles.map(title => {title})
    }
  }
  
  render() {
    const album = this.state.album
    return (
      <Page>
        <MainHeading>Album {album.id} legjobb {album.songs.length} dala</MainHeading>
        {this.state.loaded && <main>
            <Card>
              <Album open value={this.state.album} />
            </Card>
          </main>}
        <RaisedButton>
          <Link to="/albums">Vissza</Link>
        </RaisedButton>
      </Page>
    );
  }
}

export default BestSongsPage;
