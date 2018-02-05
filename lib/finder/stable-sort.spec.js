"use strict"

const { expect } = require("chai")

const stableSort = require("./stable-sort")

describe("Stable sort", function() {
  context("given an array of a comparable type", function() {
    context("if the array is empty", function() {
      it("returns an empty array", function () {
        expectSortTo([], [])
      })
    })
    
    function expectSortTo(initialArr, resultArr) {
      return expect(stableSort(initialArr)).to.deep.equal(resultArr)
    }

    context("if the array has one element", function() {
      it("returns an identical array", function() {
        expectSortTo([3], [3])
        expectSortTo([1.3], [1.3])
        expectSortTo(["a"], ["a"])
      })
    })

    context("if the array has two different elements", function() {
      it("returns the elements in ascending order", function() {
        expectSortTo([1, 2], [1, 2])
        expectSortTo([3, 0], [0, 3])
        expectSortTo([3.1, 0.5], [0.5, 3.1])
        expectSortTo(["a", "b"], ["a", "b"])
        expectSortTo(["t", "c"], ["c", "t"])
      })
    })

    context("if the array has two equal elements", function() {
      it("returns an array of the two elements", function() {
        expectSortTo([1, 1], [1, 1])
        expectSortTo([1.5, 1.5], [1.5, 1.5])
        expectSortTo(["f", "f"], ["f", "f"])
      })
    })

    context("if the array has more elements", function() {
      it("returns the elements in ascending order", function() {
        expectSortTo(
            [1, 2, 3]
          , [1, 2, 3]
        )
        expectSortTo(
            [3, 4, 0, 2]
          , [0, 2, 3, 4]
        )
        expectSortTo(
            [3, 1, 2, 4, 0]
          , [0, 1, 2, 3, 4]
        )
        expectSortTo(
            [4.5, 3.8, 2.3, 0.2]
          , [0.2, 2.3, 3.8, 4.5]
        )
        expectSortTo(
            [3.8, 1.1, 2.3, 4.5, 0.2]
          , [0.2, 1.1, 2.3, 3.8, 4.5]
        )
        expectSortTo(
            ["a", "g", "c"]
          , ["a", "c", "g"]
        )
        expectSortTo(
            ["t", "c", "f", "w"]
          , ["c", "f", "t", "w"]
        )
      })

      it("preserves the number of equal elements", function() {
        expectSortTo(
            [1, 1, 1]
          , [1, 1, 1]
        )
        expectSortTo(
            [3, 3, 0, 0]
          , [0, 0, 3, 3]
        )
        expectSortTo(
            [3, 1, 1, 4, 3]
          , [1, 1, 3, 3, 4]
        )
        expectSortTo(
            [1.3, 1.3, 1.3]
          , [1.3, 1.3, 1.3]
        )
        expectSortTo(
            [3.4, 1.9, 1.9, 3.4]
          , [1.9, 1.9, 3.4, 3.4]
        )
        expectSortTo(
            ["a", "c", "c"]
          , ["a", "c", "c"]
        )
        expectSortTo(
            ["t", "c", "f", "t"]
          , ["c", "f", "t", "t"]
        )
      })
    })
  })
    
  function expectSortToBy(initialArr, resultArr, evalFn) {
    return expect(stableSort(initialArr, evalFn)).to.deep.equal(resultArr)
  }

  context("given an array and an evaluating function that expects an element and returns a comparable type" +
      " (let's call the value returned by this function 'rating' and elements with equal ratings 'equivalent')", function() {
    context("if the array is empty", function() {
      it("returns an empty array", function() {
        expectSortToBy([], [], elem => elem)
        expectSortToBy([], [], elem => elem.value)
      })
    })

    context("if the array has one element", function() {
      it("returns an identical array", function() {
        expectSortToBy(
            [[5, 2, 3]]
          , [[5, 2, 3]]
          , elem => elem.length
        )
        expectSortToBy(
            [{value : "v"}]
          , [{value : "v"}]
          , elem => elem.value
        )
      })
    })

    context("if the array has two non-equivalent elements", function() {
      it("returns the elements in ascending order of their rating", function() {
        expectSortToBy(
            [[2, 1, 3], [9, 8]]
          , [[9, 8], [2, 1, 3]]
          , elem => elem.length
        )
        expectSortToBy(
            [{value : "v"}, {value : "az"}]
          , [{value : "az"}, {value : "v"}]
          , elem => elem.value
        )
      })
    })

    context("if the array has two equivalent elements", function() {
      it("returns the elements in their original order", function() {
        expectSortToBy(
            [2.7, 2.3]
          , [2.7, 2.3]
          , Math.floor
        )
        expectSortToBy(
            [[2, 1, 3], [9, 8, 13]]
          , [[2, 1, 3], [9, 8, 13]]
          , elem => elem.length
        )
        expectSortToBy(
            [{a : 5, v : "g"}, {a : 3, v : "g"}]
          , [{a : 5, v : "g"}, {a : 3, v : "g"}]
          , elem => elem.v
        )
        expectSortToBy(
            [{a : 0, v : "raklap"}, {a : 3, v : "raklap"}]
          , [{a : 0, v : "raklap"}, {a : 3, v : "raklap"}]
          , elem => elem.v
        )
      })
    })

    context("if the array has more non-equivalent elements", function() {
      it("returns the elements in ascending order of their rating", function() {
        expectSortToBy(
            [[2, 1, 3], ["9", "8"], [1, 2, 3, 4], [], [{}, ["a"], 3, 1, "foo"], [[[[1]]]]]
          , [[], [[[[1]]]], ["9", "8"], [2, 1, 3], [1, 2, 3, 4], [{}, ["a"], 3, 1, "foo"]]
          , elem => elem.length
        )
        expectSortToBy(
            [{v : "v"}, {v : "az"}, {v : "da"}, {v : "aza"}, {v : "daa"}, {v : "vu"}, {v : "i"}, {v : "b"}, {v : "s"}, {v : "azap"}]
          , [{v : "az"}, {v : "aza"}, {v : "azap"}, {v : "b"}, {v : "da"}, {v : "daa"}, {v : "i"}, {v : "s"}, {v : "v"}, {v : "vu"}]
          , elem => elem.v
        )
      })
    })

    context("if the array has more elements and some of them are equivalent", function() {
      it("returns the elements in ascending order of their rating preserving the original order of equivalent pairs", function() {
        expectSortToBy(
            [
                [2, 1, 3]
              , ["9", "8"]
              , ["t", {}, 1, 4, 2]
              , [1, 2, 4]
              , ["z"]
              , [{}, ["a"], 3, 1, "foo"]
              , [{a:5}, [[[1]]]]
              , []
              , [{a:"m"}]
              , [5, "g", {}]
              , ["q"]
            ]
          , [
                []
              , ["z"]
              , [{a:"m"}]
              , ["q"]
              , ["9", "8"]
              , [{a:5}, [[[1]]]]
              , [2, 1, 3]
              , [1, 2, 4]
              , [5, "g", {}]
              , ["t", {}, 1, 4, 2]
              , [{}, ["a"], 3, 1, "foo"]
            ]
          , elem => elem.length
        )
        expectSortToBy(
            [
                {v : "v"}
              , {v : "aza"}
              , {v : "di"}
              , {v : "azap"}
              , {v : "daa"}
              , {v : "vu"}
              , {v : "ds"}
              , {v : "a"}
              , {v : "va"}
              , {v : "da"}
              , {v : "az"}
            ]
          , [
                {v : "aza"}
              , {v : "azap"}
              , {v : "a"}
              , {v : "az"}
              , {v : "di"}
              , {v : "daa"}
              , {v : "ds"}
              , {v : "da"}
              , {v : "v"}
              , {v : "vu"}
              , {v : "va"}
            ]
          , elem => elem.v.substring(0, 1)
        )
      })
    })
  })

  context("given an evaluating function that also expects the index of the element in the array", function() {
    context("if the array is empty", function() {
      it("returns an empty array", function() {
        expectSortToBy([], [], (elem, ind) => elem * ind)
        expectSortToBy([], [], (elem, ind) => elem * ind)
      })
    })

    context("if the array has one element", function() {
      it("returns an identical array", function() {
        expectSortToBy([[1, 0, 2]], [[1, 0, 2]], (elem, ind) => elem.length * ind)
        expectSortToBy(["abc"], ["abc"], (elem, ind) => elem.substring(ind))
        expectSortToBy([{v : 5}], [{v : 5}], (elem, ind) => elem.v + ind)
      })
    })

    context("if the array has more elements", function() {
      it("returns the elements in ascending order of their rating", function() {
        expectSortToBy(
            [
                {v : "va"} // 2
              , {v : "aza"} // 3
              , {v : "di"} // 4
              , {v : "azap"} // 12
              , {v : "da"} // 8
              , {v : "v"} // 5
              , {v : "dss"} // 18
              , {v : "a"} // 7
              , {v : "vu"} // 16
              , {v : "daa"} // 27
              , {v : "az"} // 20
            ]
          , [
                {v : "va"}
              , {v : "aza"}
              , {v : "di"}
              , {v : "v"}
              , {v : "a"}
              , {v : "da"}
              , {v : "azap"}
              , {v : "vu"}
              , {v : "dss"}
              , {v : "az"}
              , {v : "daa"}
            ]
          , (elem, ind) => elem.v.length * ind
        )
      })

      it("preserves the order of equivalent elements", function() {
          expectSortToBy(
            [
                {v : "a"} // 6
              , {v : "abc"} // 7
              , {v : "b"} // 4
              , {v : "ab"} // 4
              , {v : "abcde"} // 6
              , {v : "abcdef"} // 6
              , {v : "c"} // 2
              , {v : "xyzvw"} // 7
              , {v : "xyz"} // 6
              , {v : ""} // 4
              , {v : "d"} // 6
            ]
          , [
                {v : "c"}
              , {v : "b"}
              , {v : "ab"}
              , {v : ""}
              , {v : "a"}
              , {v : "abcde"}
              , {v : "abcdef"}
              , {v : "xyz"}
              , {v : "d"}
              , {v : "abc"}
              , {v : "xyzvw"}
            ]
          , (elem, ind) => elem.v.length + Math.abs(ind - 5)
        )
      })
    })
  })
})