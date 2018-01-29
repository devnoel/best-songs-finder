"use strict"

const { expect } = require("chai")

const BestSongsFinder = require("./index")
const { Song } = require("../model")

const sampleAlbums = require("./sample-albums")

describe("BestSongsFinder", function() {

  beforeEach(function() {
    BestSongsFinder.useCustomRating(song => song.frequency)
  })

  describe("constructor(songs, n)", function() {
    it("expects an array and a number", function() {
      const finder = new BestSongsFinder([], 1)
      expect(finder).to.be.instanceof(BestSongsFinder)
    })

    context("if a parameter of wrong type is given", function() {
      it("throws a TypeError", function() {
        const callWithWrongType1 = () => new BestSongsFinder("foo", 1)
        const callWithWrongType2 = () => new BestSongsFinder([], "bar")
        expect(callWithWrongType1).to.throw(TypeError)
        expect(callWithWrongType2).to.throw(TypeError)
      })
    })
  })

  describe("find()", function() {
    context("given an empty array and a number", function() {
      it("returns an empty array", function() {
        const finder = new BestSongsFinder([], 1)
        expect(finder.find()).to.deep.equal([])
      })
    })

    context("given an array of songs and a zero", function() {
      it("returns an empty array", function() {
        const finder = new BestSongsFinder(sampleAlbums.songs, 0)
        expect(finder.find()).to.deep.equal([])
      })
    })

    context("given an array of one song", function() {
      context("and a positive number", function() {
        it("returns an array of the song's title", function() {
          const finder = new BestSongsFinder(sampleAlbums.oneSong, 3)
          expect(finder.find()).to.deep.equal(sampleAlbums.bestOfOneSong)
        })
      })

      context("and a negative number", function() {
        it("returns an array of the song's title", function() {
          const finder = new BestSongsFinder(sampleAlbums.oneSong, 3)
          expect(finder.find()).to.deep.equal(sampleAlbums.bestOfOneSong)
        })
      })
    })

    context("given an array 'a' of songs with different qualities", function() {
      context("and a positive number 'n'", function() {
        context("if n <= a.length()", function() {
          it("returns the top rated n songs' title in descending order of quality", function() {
            const finder = new BestSongsFinder(sampleAlbums.songs, 3)
            expect(finder.find()).to.deep.equal(sampleAlbums.bestOfSongs.slice(0, 3))
          })
        })
        
        context("if n > a.length()", function() {
          it("returns the songs' title in descending order of quality", function() {
            const finder = new BestSongsFinder(sampleAlbums.songs, 30)
            expect(finder.find()).to.deep.equal(sampleAlbums.bestOfSongs)
          })
        })
      })

      context("and a negative number 'n'", function() {
        context("if abs(n) <= a.length()", function() {
          it("returns the lowest rated abs(n) songs' title in ascending order of quality", function() {
            const finder = new BestSongsFinder(sampleAlbums.songs, -3)
            const worst3Songs = sampleAlbums.bestOfSongs.slice(-3).reverse()
            expect(finder.find()).to.deep.equal(worst3Songs)
          })
        })
        
        context("if abs(n) > a.length()", function() {
          it("returns the songs' title in ascending order of quality", function() {
            const finder = new BestSongsFinder(sampleAlbums.songs, -30)
            expect(finder.find()).to.deep.equal([...sampleAlbums.bestOfSongs].reverse())
          })
        })
      })
    })

    context("given an array of songs with repeating qualities", function() {
      context("and a positive number", function() {
        it("returns the song titles stably sorted", function() {
          const finder = new BestSongsFinder(sampleAlbums.songsWithSameFreqs, 30)
          expect(finder.find()).to.deep.equal(sampleAlbums.bestOfSongsWithSameFreqs)
        })
      })
      
      context("and a negative number", function() {
        it("returns the song titles stably sorted and then reversed", function() {
          const finder = new BestSongsFinder(sampleAlbums.songsWithSameFreqs, -30)
          expect(finder.find()).to.deep.equal([...sampleAlbums.bestOfSongsWithSameFreqs].reverse())
        })
      })
    })
  })

  describe("static useCustomRating(fn)", function() {

    function withFnGetTitles(fn, titles) {
      BestSongsFinder.useCustomRating(fn)
      const finder = new BestSongsFinder(sampleAlbums.songs, 30)
      expect(finder.find()).to.deep.equal(titles)
    }

    context("given a rating function of type S -> N, where S is the type of songs and N is the type of numbers", function() {
      it("modifies the sorting of new BestSongsFinder instances"
          + " according to the values returned by the function", function() {
        withFnGetTitles(
            song => Math.abs(song.frequency - 100000)
          , sampleAlbums.bestAndWorstFirst
        )
      })
    })

    context("given a rating function of type S x I -> N, where i is the index of s if (s, i) in S x I", function() {
      it("modifies the sorting according to the values returned by the function", function() {
        withFnGetTitles(
            (song, ind) => (song.frequency + ind * 10000)
          , sampleAlbums.lastSongsUprated
        )
      })
    })

    it("does not affect functionality of existing BestSongsFinder instances", function() {
      BestSongsFinder.useCustomRating(song => song.frequency)
      const finder = new BestSongsFinder(sampleAlbums.songs, 30)
      BestSongsFinder.useCustomRating(song => Math.abs(song.frequency - 100000))
      expect(finder.find()).to.deep.equal(sampleAlbums.bestOfSongs)
    })
  })

  describe("static useDefaultRating()", function() {
    it("changes the evaluating function based on which the songs should be sorted"
        + " to the Zipf distribution based rating", function() {
      BestSongsFinder.useDefaultRating()
      const finder = new BestSongsFinder(sampleAlbums.songs, 30)
      expect(finder.find()).to.deep.equal(sampleAlbums.zipfSortedSongs)
    })
  })
})