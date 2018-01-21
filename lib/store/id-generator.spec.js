"use strict"

const { expect } = require("chai")

const idGenerator = require("./id-generator")
const { unique } = require("../util")

describe("ID generator", function() {
  it("returns a generator object with a next function", function() {
    const gen = idGenerator()
    expect(gen).to.have.property("next").that.is.a("function")
  })

  describe("next()", function() {
    beforeEach(function() {
      this.gen = idGenerator()
    })
    
    it("implements Iterator pattern - returns a {value, done} object", function() {
      const id = this.gen.next()
      expect(id).to.haveOwnProperty("value")
      expect(id).to.haveOwnProperty("done").that.is.a("Boolean")
    })
    
    it("its value is a number", function() {
      const id = this.gen.next()
      expect(id.value).to.be.a("number")
    })
    
    it("returns unique values", function() {
      let arr = []
      for(let i=0; i < 1000; ++i)
        arr.push(this.gen.next().value)
      expect(unique(arr).length).to.equal(arr.length)
    })
  })
})