module.exports = {
  plugins: [
      require('autoprefixer')({
          browsers: [
              '>1%',
              "last 5 versions",
              "Firefox >=45",
              "IOS >= 8",
              "Safari >= 8",
              "ie >= 8"
          ]
      })
  ]
}