"use strict"

import React, { Component } from "react";

class Page extends Component {
  render() {
    const propClazz = this.props.className
    return (
      <div className={"cl-page " + (propClazz || "")}>
        {this.props.children}
      </div>
    )
  }
}

export default Page;
