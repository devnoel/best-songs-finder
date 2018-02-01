"use strict"

import React, { Component } from 'react';
import Song from './Song';

class SongListItem extends Component {
  render() {
    return (
      <li>
        <Song value={this.props.song} />
      </li>
    );
  }
}

export default SongListItem;
