const router = require('koa-router')()
const debug = require('debug')('router')

import path from 'path'
import sendfile from 'koa-sendfile'

function *demoClientRender() {
  const html = path.join(__dirname, '../views/index.html')
  debug(html)
  console.log(html)
  yield sendfile(this, path.join(__dirname, '../views/index.html'))
}

router.get('demo', '/(.*)', demoClientRender)

export default router

