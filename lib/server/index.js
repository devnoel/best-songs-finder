"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const { store, AlbumNotFoundError } = require("../store")
const BestSongsFinder = require("../finder")
const { Song } = require("../model")

const app = express()
app.use("/api", bodyParser.json())

const OK = 200
const CREATED = 201
const BAD_REQUEST = 400
const NOT_FOUND = 404
const SERVICE_UNAVAILABLE = 503

app.get("/api/albums", async function(req, res) {
  const albums = await store.loadAll()
  res.status(OK)
    .send(albums)
    .end()
})

app.get("/api/albums/:id/best", async function(req, res) {
  try {
    const finder = await finderForRequest(req)
    res.status(OK)
      .send(finder.find())
  } catch(e) {
    setStatusForError(res, e)
  }
  res.end()
})

async function finderForRequest(req) {
  const id = parseInt(req.params.id)
  const top = parseInt(req.query.top)
  const albumEntry = await store.load(id)
  return new BestSongsFinder(albumEntry.album, top)
}

function setStatusForError(res, e) {
  if (e instanceof AlbumNotFoundError) res.status(NOT_FOUND)
  else if (e instanceof TypeError) res.status(BAD_REQUEST)
  else res.status(SERVICE_UNAVAILABLE)
}

app.post("/api/albums", async function(req, res) {
  const album = req.body.map(song => new Song(song.title, song.frequency))
  const id = await store.save(album)
  res.status(CREATED)
    .send({id})
    .end()
})

module.exports = app