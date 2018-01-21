"use strict"

const { expect } = require("chai")

const zipfBasedRating = require("./zipf-based-rating")

describe("Zipf based rating", function() {
  context("given a positive frequency and a positive rank", function() {
    it("returns the product of them", function() {
      expect(zipfBasedRating(1, 1)).to.equal(1)
      expect(zipfBasedRating(1, 2)).to.equal(2)
      expect(zipfBasedRating(2, 1)).to.equal(2)
      expect(zipfBasedRating(2, 2)).to.equal(4)
      expect(zipfBasedRating(3, 5)).to.equal(15)
    })
  })

  context("given a non-positive frequency or a non-positive rank", function() {
    it("throws a RangeError", function() {
      expect(() => zipfBasedRating(0, 1)).to.throw(RangeError)
      expect(() => zipfBasedRating(-1, 1)).to.throw(RangeError)
      expect(() => zipfBasedRating(1, 0)).to.throw(RangeError)
      expect(() => zipfBasedRating(1, -1)).to.throw(RangeError)
      expect(() => zipfBasedRating(0, 0)).to.throw(RangeError)
      expect(() => zipfBasedRating(-1, -1)).to.throw(RangeError)
    })
  })
})