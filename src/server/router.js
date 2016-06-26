const rt = require('koa-router')
const debug = require('debug')('router')

import path from 'path'
import sendfile from 'koa-sendfile'

import apiRouter from 'server/api'

export const router = rt()

function *demoClientRender() {
  const html = path.join(__dirname, '../views/index.html')
  debug(html)
  yield sendfile(this, path.join(__dirname, '../views/index.html'))
}

router

export function setRoutes() {
  router
    .use(apiRouter.routes())
    .get('demo', '/(.*)', demoClientRender)
}
