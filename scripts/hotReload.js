import debug from 'debug'
import chokidar from 'chokidar'
import webpack from 'webpack'
import webpackConfig from 'config/webpack-dev'
import webpackDev from 'koa-webpack-dev-middleware'
import webpackHot from 'koa-webpack-hot-middleware'

import { SERVER, APP } from 'config/paths'

const log = {
  webpack: debug('webpack'),
  hot: debug('hotReload')
}

export default function hotReload(app) {
  const compiler = webpack(webpackConfig)
  compiler.plugin('compile', () => log.webpack('Webpack compile started'))
  compiler.plugin('compilation', () => log.webpack('Webpack compiling'))

  app.use(webpackDev(compiler, {
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      reasons: true,
    },
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHot(compiler))

  const watcher = chokidar.watch(SERVER)
  log.hot('Watching server source')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      log.hot('Clearing /server/ module cache from server')
      console.log('zwwww', Object.keys(require.cache).filter(id => !/node_modules/.test(id)))
      Object.keys(require.cache).forEach((id) => {
        if (/\/server\//.test(id)) {
          console.log(id)
          delete require.cache[id]
        }
      })
    })
  })

  log.hot('Watching client app source')
  compiler.plugin('done', () => {
    log.hot('Clearing /app/ module cache from server')
    // Object.keys(require.cache).forEach((id) => {
    //   if (/\/app\//.test(id)) {
    //     console.log(id)
    //     delete require.cache[id]
    //   }
    //   else if (/\/server\//.test(id)) {
    //     console.log(id)
    //     delete require.cache[id]
    //   }
    // })
    // isomorphicTools.refresh()
  })
}
