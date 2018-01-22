"use strict"

const idGenerator = require("./id-generator")
const { Song } = require("../model")

class Store {
  constructor() {
    this.albums = []
    this.id = idGenerator()
  }

  async save(album) {
    checkAlbumValidity(album)
    const albumEntry = { album, id: this.id.next().value }
    this.albums.push(albumEntry)
    return albumEntry.id
  }

  async load(id) {
    const albumEntry = this.albums.find(album => album.id === id)
    if(!albumEntry) throw new AlbumNotFoundError("[Store > find] no album with id " + id + " found")
    return {...albumEntry}
  }

  async loadAll() {
    return [...this.albums]
  }

  async delete(id) {
    const newAlbums = this.albums.filter(album => album.id !== id)
    if(newAlbums.length === this.albums.length) {
      throw new AlbumNotFoundError("[Store > delete] no album with id " + id + " found")
    }
    this.albums = newAlbums
  }

  async deleteAll() {
    this.albums = []
  }
}

function checkAlbumValidity(album) {
  if ( !(album instanceof Array) || !isArrayOfTypeSong(album)) {
    throw TypeError("[Store > save] expected an array of type Song, but received " + album)
  }
}

function isArrayOfTypeSong(arr) {
  return arr.reduce((songsForNow, elem) => songsForNow && isSong(elem), true)
}

function isSong(value) {
  return value.hasOwnProperty("title")
      && value.hasOwnProperty("frequency")
}

class AlbumNotFoundError extends Error {
  constructor(message) {
    super(message)
  }
}

const store = new Store()

module.exports = {
    store
  , AlbumNotFoundError
}