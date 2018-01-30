"use strict"

const app = require("./lib/server")
const port = process.env.port || 8080

app.listen(port, function() {
  console.log("App is running on port " + port)
})

module.exports = app