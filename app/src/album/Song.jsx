"use strict"

import React, { Component } from 'react';
import SongTile from './SongTile';

class Song extends Component {
  render() {
    const song = this.props.value
    return (
      <SongTile>
        <p key="title">{song.title}</p>
        {song.frequency && <p key="freq">{song.frequency} lejátszás</p>}
      </SongTile>
    );
  }
}

export default Song;
