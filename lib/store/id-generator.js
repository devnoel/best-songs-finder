"use strict"

function* idGenerator() {
  let id = 0
  while (true) {
    yield id++
  }
}

module.exports = idGenerator