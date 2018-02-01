"use strict"

import React, { Component } from 'react';
import Tile from '../common-layout/Tile';

class AlbumHeader extends Component {
  render() {
    return (
      <Tile>
        <h2>{this.props.title}</h2>
      </Tile>
    );
  }
}

export default AlbumHeader;
