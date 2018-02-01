"use strict"

import React, { Component } from 'react';
import NumberInput from './NumberInput';
import SongTile from '../album/SongTile';

class NewSongInput extends Component {
  constructor(props) {
    super(props);
    this.initialState = {title: "", frequency: ""}
    this.state = this.initialState

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleFrequencyChange(freq) {
    this.setState({
      frequency: freq
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onNewSong({
      title: this.state.title,
      frequency: this.state.frequency
    })
    this.setState(this.initialState)
  }

  isValid() {
    return this.state.title && this.state.frequency
  }

  render() {
    const song = this.state
    return (
      <SongTile>
        <input key="title" type="text" value={song.title} placeholder="Dal címe..."
            onChange={this.handleTitleChange} />
        <NumberInput key="freq" value={song.frequency} placeholder="Lejátszások száma..."
            onChange={this.handleFrequencyChange} />
        <input key="submit" type="submit" value="Hozzáad" disabled={!this.isValid()}
            onClick={this.handleSubmit} />
      </SongTile>
    );
  }
}

export default NewSongInput;
