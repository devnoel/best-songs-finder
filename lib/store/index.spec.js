"use strict"

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { expect } = chai

const { store, AlbumNotFoundError } = require("./index")
const { Song } = require("../model")
const { unique } = require("../util")

describe("Store", function() {
  beforeEach(async function() {
    await store.deleteAll()
  })

  const titles = ["a", "b", "c", "d", "e", "f"]
  const identicalTitles = Array(6).fill("z")

  describe("save(songs)", function() {
    it("throws a TypeError if songs is not an array of Song instances", function() {
      expect(store.save({a: 5})).to.be.rejectedWith(TypeError)
      expect(store.save([{title: "a"}])).to.be.rejectedWith(TypeError)
    })

    it("assigns an id to the album and returns it", async function() {
      expect(await store.save([new Song("a", 1)])).to.be.a("number")
    })

    it("saves the album so that it can be loaded later", async function() {
      await expectLoadedAfterSaving(titles)
    })

    let ids = []
    
    it("returns unique ids", async function() {
      await Promise.all([
          expectUniqueIdsAfterSaving(titles)
        , expectUniqueIdsAfterSaving(identicalTitles)
        , expectUniqueIdsAfterSavingAfterDeletingFrom(0, 2)
        , expectUniqueIdsAfterSavingAfterDeletingFrom(4, 6)
        , expectUniqueIdsAfterSavingAfterDeletingFrom(15)
      ])
    })

    async function expectUniqueIdsAfterSaving(titles) {
      ids = ids.concat(await saveWithTitles(titles))
      expect(unique(ids).length).to.equal(ids.length)
    }

    async function expectUniqueIdsAfterSavingAfterDeletingFrom(start, end) {
      await deleteFrom(ids, start, end)
      await expectUniqueIdsAfterSaving(titles, ids)
    }
  })

  async function saveWithTitles(titles) {
    const albums = titles.map(title => [new Song(title, 10)])
    return await Promise.all( albums.map(songs => store.save(songs)) )
  }

  async function expectLoadedAfterSaving(titles) {
    const ids = await saveWithTitles(titles)
    const loadedAlbums = await Promise.all( ids.map(id => store.load(id)) )
    const loadedTitles = loadedAlbums.map(album => album.songs[0].title)
    expect(loadedTitles).to.have.members(titles)
    return ids
  }

  async function deleteFrom(ids, start, end) {
    const idsToDel = ids.slice(start, end)
    await Promise.all( idsToDel.map(id => store.delete(id)) )
  }

  describe("load(id)", function() {
    it("loads the album specified by the id", async function() {
      await expectLoadedAfterSaving(titles)
    })

    context("given an invalid id", function() {
      it("throws a AlbumNotFoundError", function() {
        expect(store.load(10000)).to.be.rejectedWith(AlbumNotFoundError)
      })
    })
  })

  describe("loadAll()", function() {
    it("loads all albums", async function() {
      await expectLoadedAllAfterSaving(titles)
    })
  })

  async function expectLoadedAllAfterSaving(titles) {
    await saveWithTitles(titles)
    const loadedTitles = (await store.loadAll()).map(album => album.songs[0].title)
    expect(loadedTitles).to.have.members(titles)
  }

  describe("delete(id)", function() {
    it("removes the album specified by the id", async function() {
      beforeEach(async function() {
        await store.deleteAll()
      })

      await expectDeletedAfterSaving(["a"])
      await expectDeletedAfterSaving(["a", "b", "c", "d"], 0, 2)
      await expectDeletedAfterSaving(["a", "b", "c", "d"], 3)
    })

    async function expectDeletedAfterSaving(titles, start = 0, end = titles.length) {
      const ids = await expectLoadedAfterSaving(titles)
      await deleteFrom(ids, start, end)
      const deletedIds = ids.slice(start, end)
      const remainingIds = ids.slice(0, start).concat(ids.slice(end))
      expectDeletedNotFound(deletedIds)
      await expectRemainingFound(remainingIds)
    }

    function expectDeletedNotFound(deletedIds) {
      for(const id of deletedIds) {
        expect(store.load(id)).to.be.rejectedWith(AlbumNotFoundError)
      }
    }

    async function expectRemainingFound(remainingIds) {
      const loadedAlbums = await Promise.all( remainingIds.map(id => store.load(id)) )
      expect(loadedAlbums.length).to.equal(remainingIds.length)
    }

    context("given an invalid id", function() {
      it("throws an AlbumNotFoundError", function() {
        expect(store.delete(10000)).to.be.rejectedWith(AlbumNotFoundError)
      })
    })
  })

  describe("deleteAll()", function() {
    it("removes all albums", async function() {
      await expectLoadedAllAfterSaving(titles)
      await store.deleteAll()
      expect(await store.loadAll()).to.be.empty
    })
  })
})