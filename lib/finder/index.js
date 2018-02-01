"use strict"

const stableSort = require("./stable-sort")
const zipfBasedRating = require("./zipf-based-rating")

class BestSongsFinder {
  constructor(album, numWanted) {
    this._checkValidity(album, numWanted)
    this.album = album
    this.numWanted = Math.abs(numWanted)
    this.worstAreWanted = numWanted < 0
    this.rating = BestSongsFinder.selectedRating
    Object.freeze(this)
  }

  _checkValidity(album, n) {
    if (! (album instanceof Array))
      throw TypeError(this._expectedButReceived("first", "array", album))
    if (typeof n !== "number")
      throw TypeError(this._expectedButReceived("second", "number", n))
  }

  _expectedButReceived(position, type, received) {
    return "[BestSongsFinder > constructor] expected a(n) " + type
      + " as its " + position + " argument, but received " + received
  }

  find() {
    const sortedAlbum = stableSort(this.album, this.rating)
    let titles = sortedAlbum.map(song => song.title)
    if(this.worstAreWanted) titles.reverse()
    return titles.slice(0, this.numWanted)
  }

  static useCustomRating(ascendingRating) {
    BestSongsFinder.selectedRating = toDescending(ascendingRating)
  }
  
  static useDefaultRating() {
    BestSongsFinder.useCustomRating(BestSongsFinder.defaultRating)
  }
}

BestSongsFinder.defaultRating = function(song, index) {
  const rank = index + 1
  return zipfBasedRating(song.frequency, rank)
}
BestSongsFinder.selectedRating = BestSongsFinder.defaultRating

function toDescending(ascendingRating) {
  return function(song, index) {
    return -ascendingRating(song, index)
  }
}

module.exports = BestSongsFinder