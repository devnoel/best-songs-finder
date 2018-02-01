"use strict"

import React, { Component, Children } from "react"
import GetBestSongsInput from "../input/GetBestSongsInput"

class AlbumSongsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleSubmit(top) {
    this.props.onBestSongsRequest(top)
  }

  renderChildren() {
    const album = Children.only(this.props.children)
    return React.cloneElement(album, {
      open: true
    })
  }

  render() {
    return (
      <section>
        {this.renderChildren()}
        <GetBestSongsInput onSubmit={this.handleSubmit} />
      </section>
    )
  }
}

export default AlbumSongsContainer
