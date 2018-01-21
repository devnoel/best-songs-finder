"use strict"

const { expect } = require("chai")

const BestSongsFinder = require("../lib/finder")

describe("Component BestSongsFinder", function() {
  describe("find()", function() {
    context("given an array of songs 'arr'", function() {
      context("and a positive number 'n' <= arr.length", function() {
        it("returns the best n songs' titles stably sorted by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, 5)
          expect(finder.find()).to.deep.equal(bestOfSongs.slice(0, 5))
        })
      })
      
      context("and a positive number 'n' > arr.length", function() {
        it("returns the songs' titles stably sorted by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, 30)
          expect(finder.find()).to.deep.equal(bestOfSongs)
        })
      })
      
      context("and a negative number 'n', where abs(n) <= arr.length", function() {
        it("returns the worst abs(n) songs' titles stably ordered and then reversed"
            + " by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, -5)
          expect(finder.find()).to.deep.equal(bestOfSongs.slice(-5).reverse())
        })
      })
      
      context("and a negative number 'n', where abs(n) > arr.length", function() {
        it("returns the songs' titles stably ordered and then reversed"
            + " by their Zipf distribution based quality", function() {
          const finder = new BestSongsFinder(songs, -30)
          expect(finder.find()).to.deep.equal([...bestOfSongs].reverse())
        })
      })
    })
  })

  const songs = [
      { "frequency": 197812, "title": "re_hash" }
    , { "frequency": 78906, "title": "5_4" }
    , { "frequency": 189518, "title": "tomorrow_comes_today" }
    , { "frequency": 39453, "title": "new_genious" }
    , { "frequency": 210492, "title": "clint_eastwood" }
    , { "frequency": 26302, "title": "man_research" }
    , { "frequency": 22544, "title": "punk" }
    , { "frequency": 19727, "title": "sound_check" }
    , { "frequency": 17535, "title": "double_bass" }
    , { "frequency": 18782, "title": "rock_the_house" }
    , { "frequency": 198189, "title": "19_2000" }
    , { "frequency": 13151, "title": "latin_simone" }
  ]

  const bestOfSongs = [
      "19_2000" //2180079
    , "clint_eastwood" //1052460
    , "tomorrow_comes_today" //568554
    , "re_hash" //197812
    , "rock_the_house" //187820
    , "sound_check" //157816
    , "double_bass" //157815
    , "5_4" //157812
    , "new_genious" //157812
    , "man_research" //157812
    , "latin_simone" //157812
    , "punk" //157808
  ]
})