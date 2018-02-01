"use strict"

import React, { Component } from "react"
import RaisedButton from "../common-layout/RaisedButton"

class RaisedButtonInput extends Component {
  render() {
    return (
      <RaisedButton>
        <input type={this.props.type} value={this.props.value} />
      </RaisedButton>
    )
  }
}

export default RaisedButtonInput
