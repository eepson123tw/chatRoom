import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { Express } from 'express'

export default function (app: Express) {
  const config = require('../../webpack.config.js') //引入webpack
  const compiler = webpack(config) //轉換config檔成compiler
  //webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。
  //webpack-dev-server 在内部使用了它，然而它也可以作为一个单独的 package 来使用，
  //以便根据需求进行更多自定义设置。
  app.get('/', function (req, res, next) {
    res.redirect('/main/main.html')
  })
  app.get('/main', function (req, res, next) {
    res.redirect('/main/main.html')
  })

  app.get('/chatRoom', function (req, res, next) {
    res.redirect('/chatRoom/chatRoom.html')
  })

  //放入中間層
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  )
}
