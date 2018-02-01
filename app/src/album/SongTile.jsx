"use strict"

import React, { Component } from "react"
import Tile from "../common-layout/Tile"
const classSet = React.addons

class SongTile extends Component {
  renderChildren() {
    const existingChildren = this.props.children.filter(elem => elem)
    const isHead = this.isHead
    return existingChildren.map(function(elem, index, self) {
      const clazz = isHead(index, self) ? "cl-row-head " : "cl-row-tail "
      return React.cloneElement(elem, {
        className: clazz + (elem.className || "")
      })
    })
  }

  isHead(ind, arr) {
    return ind === 0
      || ind < arr.length - 1
  }

  render() {
    return (
      <Tile className="cl-row">
        {this.renderChildren()}
      </Tile>
    )
  }
}

export default SongTile
