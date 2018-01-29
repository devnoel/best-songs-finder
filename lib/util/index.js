"use strict"

function unique(array) {
  let found = {}
  return array.filter(function(val) {
    const isNewOccurrence = !found[val]
    found[val] = true
    return isNewOccurrence
  })
}

function merge(schema) {
  const propertyNames = Object.getOwnPropertyNames(schema)
  let mergedArray = []
  if (propertyNames.length === 0) return mergedArray
  for (let i in schema[propertyNames[0]]) {
    let element = {}
    propertyNames.forEach(prop => element[prop] = schema[prop][i])
    mergedArray.push(element)
  }
  return mergedArray
}

module.exports = { unique, merge }