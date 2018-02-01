"use strict"

import React, { Component } from 'react';

class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(e) {
    e.preventDefault()
    const val = e.target.value
    const isEmpty = val === ""
    const number = isEmpty ? val : parseInt(val)
    if (isEmpty || !isNaN(number)){
      this.props.onChange(number)
    }
  }

  render() {
    const props = this.props
    return (
      <input className={props.className} type="text" value={props.value}
        placeholder={props.placeholder} onChange={this.handleChange} />
    );
  }
}

export default NumberInput;
