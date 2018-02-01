"use strict"

import React, { Component } from "react"

class Card extends Component {
  render() {
    const propClazz = this.props.className
    return (
      <div className={"cl-card " + (propClazz || "")}>
        {/* TODO */}
        {/* {this.props.closable &&
          <CloseButton />} */}
        {this.props.children}
      </div>
    )
  }
}

export default Card
