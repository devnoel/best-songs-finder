"use strict"

function zipfBasedRating(frequency, rank) {
  if(frequency <= 0) throw RangeError(expectedPosButReceived("first", frequency))
  if(rank <= 0) throw RangeError(expectedPosButReceived("second", rank))
  return frequency * rank
}

function expectedPosButReceived(position, received) {
  return "[zipfBasedRating] expected its " + position
    + " argument to be positive, but received " + received
}

module.exports = zipfBasedRating