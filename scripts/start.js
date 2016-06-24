import koaStatic from 'koa-static'

import app from 'server'
import { isDevMode } from 'app/utils'
import config from 'config/appSetup'
import hotReload from './hotReload.js'
import {isomorphicTools, isomorphicPlugin} from 'server/isomorphicTools'

if(isDevMode()) {
  isomorphicTools.development()
  isomorphicPlugin.development()
  hotReload(app)
} else {
  const staticPart = koaStatic(path.join(__dirname, '../../public'))
  app.use(mount('/static', staticPart))
}

config(app)

app.listen(3000)
