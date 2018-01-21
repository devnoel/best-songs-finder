"use strict"

const util = require("util")

const express = require("express")
const bodyParser = require("body-parser")
const { store, AlbumNotFoundError } = require("../store")
const BestSongsFinder = require("../finder")

console.log(util.inspect(util, { showHidden: true, depth: null }))

const app = express()
app.use(bodyParser.json())

app.get("/albums", async function(req, res) {
  const albums = await store.loadAll()
  res.status(200)
    .send(albums)
    .end()
})

app.get("/albums/:id/best", async function(req, res) {
  try {
    const finder = await finderForRequest(req)
    res.status(200)
      .send(finder.find())
  } catch(e) {
    if (e instanceof AlbumNotFoundError) res.status(404)
    else if (e instanceof TypeError) res.status(400)
    else console.log(e)
  }
  res.end()
})

async function finderForRequest(req) {
  const id = parseInt(req.params.id)
  const top = parseInt(req.query.top)
  const albumEntry = await store.load(id)
  return new BestSongsFinder(albumEntry.album, top)
}

app.post("/albums", async function(req, res) {
  const id = await store.save(req.body)
  res.status(201)
    .send({id})
    .end()
})

module.exports = app