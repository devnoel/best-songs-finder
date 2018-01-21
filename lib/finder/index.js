"use strict"

const stableSort = require("./stable-sort")
const zipfBasedRating = require("./zipf-based-rating")

class BestSongsFinder {
  constructor(album, numWanted) {
    checkValidity(album, numWanted)
    this.album = album
    this.numWanted = Math.abs(numWanted)
    this.worstAreWanted = numWanted < 0
    this.rating = BestSongsFinder.selectedRating
    Object.freeze(this)
  }

  find() {
    const sortedAlbum = stableSort(this.album, this.rating)
    let titles = sortedAlbum.map(song => song.title)
    if(this.worstAreWanted) titles.reverse()
    return titles.slice(0, this.numWanted)
  }

  static useCustomRating(ascendingRating) {
    this.selectedRating = toDescending(ascendingRating)
  }
  
  static useDefaultRating() {
    this.useCustomRating(this.defaultRating)
  }
}

BestSongsFinder.defaultRating = function(song, index) {
  const rank = index + 1
  return zipfBasedRating(song.frequency, rank)
}
BestSongsFinder.selectedRating = BestSongsFinder.defaultRating

function checkValidity(album, n) {
  if (! (album instanceof Array))
    throw TypeError(expectedButReceived("first", "array", album))
  if (typeof n !== "number")
    throw TypeError(expectedButReceived("second", "number", n))
}

function expectedButReceived(position, type, received) {
  return "[BestSongsFinder > constructor] expected a(n) " + type
    + " as its " + position + " argument, but received " + received
}

function toDescending(ascendingRating) {
  return function(song, index) {
    return -ascendingRating(song, index)
  }
}

module.exports = BestSongsFinder