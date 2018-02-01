"use strict"

import React, { Component } from 'react';
import Album from '../album/Album';
import AlbumEditContainer from '../album/AlbumEditContainer';

class NewAlbum extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit(songs) {
    const onNewAlbum = this.props.onNewAlbum
    const req = new XMLHttpRequest()
    req.open("POST", "/api/albums")
    req.setRequestHeader("Content-type", "application/json")
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        onNewAlbum()
      }
    }
    req.send(JSON.stringify(songs))
  }
  
  render() {
    return (
      <AlbumEditContainer onSubmit={this.handleSubmit}>
        <Album />
      </AlbumEditContainer>
    );
  }
}

export default NewAlbum;
