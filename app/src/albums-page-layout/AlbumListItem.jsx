"use strict"

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AlbumSongsContainer from '../album/AlbumSongsContainer';
import Album from '../album/Album';

class AlbumListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      top: props.album.length
    }
    this.handleRequest = this.handleRequest.bind(this)
  }
  
  componentWillUnmount() {
    this.setState({
      requested: false
    })
  }

  handleRequest(top) {
    this.setState({
      requested: true,
      top: top
    })
  }
  
  render() {
    const { state, props } = this
    if (state.requested) {
      return (
        <Redirect to={{
          pathname: `/albums/${props.album.id}/best`,
          search: `?top=${state.top}`
        }} />
      )
    }
    return (
      <li className="apl-album-li">
        <AlbumSongsContainer onBestSongsRequest={this.handleRequest}>
          <Album value={props.album} />
        </AlbumSongsContainer>
      </li>
    );
  }
}

export default AlbumListItem;
