"use strict"

import React, { Component } from 'react';
import AlbumListItem from "./AlbumListItem"
import Card from '../common-layout/Card';

class AlbumList extends Component {
  render() {
    return (
      <Card>
        <ul>
          {this.props.albums.map(album =>
            <AlbumListItem key={album.id} album={album} />
          )}
        </ul>
      </Card>
    );
  }
}

export default AlbumList;
