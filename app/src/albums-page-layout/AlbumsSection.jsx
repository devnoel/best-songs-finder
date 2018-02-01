"use strict"

import React, { Component, Fragment } from "react"
import MainHeading from "../common-layout/MainHeading"
import AlbumList from "./AlbumList"
import NewAlbum from "./NewAlbum"

class AlbumsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
    this.updateAlbums = this.updateAlbums.bind(this)
  }

  componentDidMount() {
    this.updateAlbums()
  }

  updateAlbums() {
    const setState = this.setState.bind(this)
    const req = new XMLHttpRequest()
    req.open("GET", "api/albums")
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        setState({
          albums: JSON.parse(this.responseText)
        })
      }
    }
    req.send()
  }

  render() {
    return (
      <Fragment>
        <MainHeading>Albumok</MainHeading>
        <AlbumList albums={this.state.albums} />
        <NewAlbum onNewAlbum={this.updateAlbums} />
      </Fragment>
    )
  }
}

export default AlbumsSection