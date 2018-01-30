module.exports = {
  entry: __dirname + "app/App",
  output: {
    path: __dirname + "build",
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      { test: /\.jsx$/, use: "babel-loader" }
    ]
  }
}