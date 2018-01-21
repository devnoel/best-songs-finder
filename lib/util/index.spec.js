"use strict"

const { expect } = require("chai")
const { unique, merge } = require("./index")

describe("unique", function() {
  context("given an array of a primitive type", function() {
    context("if the array is empty", function() {
      it("returns an empty array", function() {
        expect(unique([])).to.deep.equal([])
      })
    })
    
    context("if the array has one element", function() {
      it("returns an identical array", function() {
        expect(unique([1])).to.deep.equal([1])
      })
    })
    
    context("if the array has two elements", function() {
      context("if they are different", function() {
        it("returns an identical array", function() {
          expect(unique([1, 2])).to.deep.equal([1, 2])
        })
      })
      
      context("if they are equal", function() {
        it("returns an array with only one of the elements", function() {
          expect(unique(['a', 'a'])).to.deep.equal(['a'])
        })
      })
    })
    
    context("if the array has more elements", function() {
      context("if they are all different", function() {
        it("returns an identical array", function() {
          expect(unique([1, 2, 3, 4])).to.deep.equal([1, 2, 3, 4])
          expect(unique([1, 3, 2, 4])).to.deep.equal([1, 3, 2, 4])
          expect(unique(['a', 'd', 'c', 'b'])).to.deep.equal(['a', 'd', 'c', 'b'])
          expect(unique(['d', 'c', 'b', 'a'])).to.deep.equal(['d', 'c', 'b', 'a'])
        })
      })
      
      context("if some of them are equal", function() {
        it("returns an array with only the first occurrence of each of the same elements", function() {
          expect(unique(['a', 'a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c'])
          expect(unique(['a', 'b', 'b', 'c'])).to.deep.equal(['a', 'b', 'c'])
          expect(unique(['a', 'b', 'c', 'c'])).to.deep.equal(['a', 'b', 'c'])
          expect(unique(['a', 'b', 'a', 'c'])).to.deep.equal(['a', 'b', 'c'])
          expect(unique([1, 2, 3, 1])).to.deep.equal([1, 2, 3])
          expect(unique([2, 1, 2, 1])).to.deep.equal([2, 1])
          expect(unique([3, 2, 3, 1])).to.deep.equal([3, 2, 1])
          expect(unique([1, 1, 1, 1])).to.deep.equal([1])
        })
      })
    })
  })
})