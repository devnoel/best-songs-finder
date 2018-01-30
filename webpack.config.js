const path = require("path")

const config = {
  entry: path.resolve(__dirname, "app/App.jsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, use: "babel-loader" }
    ]
  }
}

module.exports = config