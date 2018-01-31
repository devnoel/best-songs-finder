"use strict"

const express = require("express")
const app = require("./lib/server")
const path = require("path")
const dist = path.resolve(__dirname, "app", "dist")
const port = process.env.port || 8080

app.use("/public", express.static(dist))

app.get("*", function(req, res){
  res.sendFile(path.resolve(dist, "index.html"))
})

app.listen(port, function() {
  console.log("App is running on port " + port)
})

module.exports = app