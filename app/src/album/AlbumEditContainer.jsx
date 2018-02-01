"use strict"

import React, { Component, Children } from 'react';
import Card from '../common-layout/Card';
import NewSongInput from '../input/NewSongInput';
import RaisedButtonInput from '../input/RaisedButtonInput';

class AlbumEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }

    this.handleNewSong = this.handleNewSong.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleNewSong(newSong) {
    this.setState(function(prevState) {
      return {
        songs: [...prevState.songs, newSong]
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.songs)
    this.setState({
      songs: []
    })
  }

  handleReset(e) {
    this.setState({
      songs: []
    })
  }

  renderChildren() {
    const album = Children.only(this.props.children)
    return React.cloneElement(album, {
      value: {
        id: "- Új",
        songs: this.state.songs
      },
      open: true
    })
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <Card>
            {this.renderChildren()}
            <NewSongInput onNewSong={this.handleNewSong} />
          </Card>
          <RaisedButtonInput type="reset" value="Törlés" />
          <RaisedButtonInput type="submit" value="Kész" />
        </form>
      </section>
    );
  }
}

export default AlbumEditContainer;
