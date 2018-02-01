"use strict"

const idGenerator = require("./id-generator")
const { Song } = require("../model")

class Store {
  constructor() {
    this.albums = []
    this.id = idGenerator()
  }

  async save(songs) {
    this._checkAlbumValidity(songs)
    const album = { songs, id: this.id.next().value }
    this.albums.push(album)
    return album.id
  }

  _checkAlbumValidity(songs) {
    if ( !(songs instanceof Array) || !this._isArrayOfTypeSong(songs)) {
      throw TypeError("[Store > save] expected an array of type Song, but received " + songs)
    }
  }

  _isArrayOfTypeSong(arr) {
    return arr.reduce(
        (songsForNow, elem) => songsForNow && elem instanceof Song
      , true
    )
  }

  async load(id) {
    const album = this.albums.find(album => album.id === id)
    if(!album) throw new AlbumNotFoundError("[Store > find] no album with id " + id + " found")
    return {...album}
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