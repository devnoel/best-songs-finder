"use strict"

const idGenerator = require("./id-generator")
const { Song } = require("../model")

class Store {
  constructor() {
    this.albums = []
    this.id = idGenerator()
  }

  async save(songs) {
    this._checkSongs(songs)
    const album = { songs, id: this.id.next().value }
    this.albums.push(album)
    return album.id
  }

  _checkSongs(songs) {
    if (!this._areValidSongs(songs)) {
      throw TypeError("[Store > save] expected an array of Songs, but received " + songs)
    }
  }

  _areValidSongs(songs) {
    return songs instanceof Array
      && this._isEachElemSongIn(songs)
  }

  _isEachElemSongIn(arr) {
    return arr.reduce(
        (arePrevElemsSongs, nextElem) => arePrevElemsSongs && nextElem instanceof Song
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