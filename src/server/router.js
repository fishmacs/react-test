const rt = require('koa-router')
const debug = require('debug')('router')

import path from 'path'
import sendfile from 'koa-sendfile'

import apiRouter from 'server/api'

const router = rt()
router.use(apiRouter.routes())

function *demoClientRender() {
  const html = path.join(__dirname, '../views/index.html')
  debug(html)
  yield sendfile(this, path.join(__dirname, '../views/index.html'))
}

router.get('demo', '/(^api/).*', demoClientRender)

export default router

