"use strict"

import React, { Component } from "react"
import NumberInput from "./NumberInput"
import Tile from "../common-layout/Tile"

class GetBestSongsInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(top) {
    this.setState({
      top: top
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.top)
  }

  render() {
    const top = this. state.top
    return (
      <form onSubmit={this.handleSubmit}>
        <Tile className="cl-row">
          <p className="cl-row-head">Keresendő dalok száma:</p>
          <NumberInput className="cl-row-head" value={top} onChange={this.handleChange} />
          <input className="cl-row-tail" type="submit" value="Keres" />
        </Tile>
      </form>
    )
  }
}

export default GetBestSongsInput
