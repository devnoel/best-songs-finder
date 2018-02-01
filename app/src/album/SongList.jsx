"use strict"

import React, { Component } from "react"
import SongListItem from "./SongListItem"

class SongList extends Component {
  render() {
    return (
      <ul>
        {this.props.songs.map(song =>
          <SongListItem key={song.title} song={song} />
        )}
      </ul>
    )
  }
}

export default SongList
