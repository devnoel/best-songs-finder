const path = require("path")
const src = path.resolve(__dirname, "app", "src")
const dist = path.resolve(__dirname, "app", "dist")

const config = {
  entry: path.resolve(src, "main.jsx"),
  output: {
    path: dist,
    filename: "main.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        include: src,
        use: [ "babel-loader" ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}

module.exports = config