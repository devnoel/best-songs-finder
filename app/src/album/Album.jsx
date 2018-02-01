"use strict"

import React, { Component, Fragment } from 'react';
import AlbumHeader from './AlbumHeader';
import SongList from './SongList';

class Album extends Component {
  render() {
    const album = this.props.value
    return (
      <Fragment>
        <AlbumHeader title={"Album " + album.id} />
        {this.props.open && <SongList songs={album.songs} />}
      </Fragment>
    );
  }
}

export default Album