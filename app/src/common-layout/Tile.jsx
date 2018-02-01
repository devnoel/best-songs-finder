"use strict"

import React, { Component } from "react"

class Tile extends Component {
  render() {
    const propClazz = this.props.className
    return (
      <div className={"cl-tile " + (propClazz || "")}>
        {this.props.children}
      </div>
    )
  }
}

export default Tile
