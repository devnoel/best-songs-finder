"use strict"

const request = require("supertest")
const { expect } = require("chai")

const app = require("./index")
const { Song } = require("../model")
const { merge } = require("../util")

const { songs, zipfSortedSongs } = require("../finder/sample-albums")

describe("Server REST API", function() {

  const titleArrays = [["a", "b"], [], ["d"], ["e", "f", "g", "h"], ["d"]]

  describe("GET", function() {
    context("/albums", function() {
      it("responds 200", async function() {
        const resp = await request(app).get("/albums")
        expect(resp.status).to.equal(200)
      })

      it("initially responds with JSON body containing an empty array", async function() {
        const resp = await request(app).get("/albums")
        expect(resp.type).to.equal("application/json")
        expect(resp.body).to.deep.equal([])
      })

      it("after posting some albums, responds with an array of them with ids", async function() {
        const albums = manyAlbumsWithTitles(titleArrays)
        const ids = idsOf(await postManyAlbums(albums))
        expect(await getAlbums()).to.have.deep.members(merge({id: ids, album: albums}))
      })
    })

    context("/albums/:id/best?top=n", function() {
      context("if there is an album specified by id", function() {
        it("responds 200", async function() {
          const id = (await postAlbum(albumWithTitles(["x", "y", "z"]))).body.id
          const resp = await request(app).get("/albums/" + id + "/best?top=2")
          expect(resp.status).to.equal(200)
        })

        it("returns the best n songs of the album in descending order of their Zipf distribution based quality", async function() {
          const id = (await postAlbum(songs)).body.id
          let resp = await request(app).get("/albums/" + id + "/best?top=2")
          expect(resp.body).to.deep.equal(zipfSortedSongs.slice(0, 2))
          resp = await request(app).get("/albums/" + id + "/best?top=30")
          expect(resp.body).to.deep.equal(zipfSortedSongs)
        })
      })

      context("if no album specified by id is found", function() {
        it("responds 404", async function() {
          const resp = await request(app).get("/albums/10000/")
          expect(resp.status).to.equal(404)
        })
      })
    })
  })

  function manyAlbumsWithTitles(titleArrays) {
    return titleArrays.map(titles => albumWithTitles(titles))
  }

  function albumWithTitles(titles) {
    return titles.map(title => new Song(title, 10))
  }

  function idsOf(responses) {
    return responses.map(resp => resp.body.id)
  }

  async function postManyAlbums(albums) {
    const respPromises = albums.map(album => postAlbum(album))
    return await Promise.all( respPromises )
  }

  async function postAlbum(album) {
    const resp = await request(app)
                          .post("/albums")
                          .send(album)
    return resp
  }

  async function getAlbums() {
    const resp = await request(app).get("/albums")
    return resp.body
  }

  describe("POST", function() {
    context("'/albums' with JSON body including an album (array of songs)", async function() {
      it("responds 201", async function() {
        const resp = await postAlbum(albumWithTitles(["a", "b"]))
        expect(resp.status).to.equal(201)
      })

      it("responds with JSON body containing the id of the posted album", async function() {
        const resp = await postAlbum(albumWithTitles(["a", "b"]))
        expect(resp.type).to.equal("application/json")
        expect(resp.body).to.have.property("id")
        expect(resp.body.id).to.be.a("number")
      })

      it("saves the album that can be requested later", async function() {
        const albums = manyAlbumsWithTitles(titleArrays)
        const ids = idsOf(await postManyAlbums(albums))
        expect(await getAlbums()).to.include.deep.members(merge({id: ids, album: albums}))
      })
    })
  })
})