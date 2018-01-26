"use strict"

const { expect } = require("chai")

const BestSongsFinder = require("../lib/finder")
const { songs, zipfSortedSongs } = require("../lib/finder/sample-albums")

describe("Component BestSongsFinder", function() {
  describe("find()", function() {
    context("given an array of songs 'arr'", function() {
      context("and a positive number 'n' <= arr.length", function() {
        it("returns the best n songs' titles stably sorted by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, 5)
          expect(finder.find()).to.deep.equal(zipfSortedSongs.slice(0, 5))
        })
      })
      
      context("and a positive number 'n' > arr.length", function() {
        it("returns the songs' titles stably sorted by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, 30)
          expect(finder.find()).to.deep.equal(zipfSortedSongs)
        })
      })
      
      context("and a negative number 'n', where abs(n) <= arr.length", function() {
        it("returns the worst abs(n) songs' titles stably ordered and then reversed"
            + " by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, -5)
          expect(finder.find()).to.deep.equal(zipfSortedSongs.slice(-5).reverse())
        })
      })
      
      context("and a negative number 'n', where abs(n) > arr.length", function() {
        it("returns the songs' titles stably ordered and then reversed"
            + " by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, -30)
          expect(finder.find()).to.deep.equal([...zipfSortedSongs].reverse())
        })
      })
    })
  })
})