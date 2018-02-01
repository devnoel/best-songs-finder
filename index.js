"use strict"

const express = require("express")
const { exec } = require("child_process")
const app = require("./lib/server")
const path = require("path")
const dist = path.resolve(__dirname, "app", "dist")
const port = process.env.port || 8080

app.use("/public", express.static(dist))

app.get("/api/build-dev", function() {
  exec("npm run build-dev", function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
})

app.get("*", function(req, res){
  res.sendFile(path.resolve(dist, "index.html"))
})

app.listen(port, function() {
  console.log("App is running on port " + port)
})

module.exports = app