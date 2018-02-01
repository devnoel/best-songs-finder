"use strict"

import React, { Component } from 'react';
import Card from './Card';

class RaisedButton extends Component {
  render() {
    return (
      <Card className={`i-raised-btn`}>
        {this.props.children}
      </Card>
    );
  }
}

export default RaisedButton;
