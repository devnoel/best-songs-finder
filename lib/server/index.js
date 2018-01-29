"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const { store, AlbumNotFoundError } = require("../store")
const BestSongsFinder = require("../finder")
const { Song } = require("../model")

const app = express()
app.use(bodyParser.json())

app.get("/albums", async function(req, res) {
  const albums = await store.loadAll()
  res.status(200 /* OK */)
    .send(albums)
    .end()
})

app.get("/albums/:id/best", async function(req, res) {
  try {
    const finder = await finderForRequest(req)
    res.status(200 /* OK */)
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
  if (e instanceof AlbumNotFoundError) res.status(404 /* Not Found */)
  else if (e instanceof TypeError) res.status(400 /* Bad Request */)
  else res.status(503 /* Service Unavailable */)
}

app.post("/albums", async function(req, res) {
  const album = req.body.map(song => new Song(song.title, song.frequency))
  const id = await store.save(album)
  res.status(201 /* Created */)
    .send({id})
    .end()
})

module.exports = app