"use strict"

function stableSort(arr, evalFn = identity) {
  const compare = compareBy(evalFn)
  let indexedArr = arr.map(addIndex)
  indexedArr.sort(compare)
  return indexedArr.map(removeIndex)
}

function identity(value) {
  return value
}

function compareBy(evalFn) {
  return function compare(left, right) {
    const leftVal = evalFn(left.value, left.index)
    const rightVal = evalFn(right.value, right.index)
    if (leftVal < rightVal) return -1
    if (leftVal > rightVal) return 1
    else return left.index - right.index
  }
}

function addIndex(elem, ind) {
  return {
    value : elem,
    index : ind
  }
}

function removeIndex(indexedElem) {
  return indexedElem.value
}

module.exports = stableSort