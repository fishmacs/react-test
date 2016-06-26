import koaStatic from 'koa-static'

import app from 'server'
import { isDevMode } from 'app/utils'
import config from 'config/appSetup'
import hotReload from './hotReload.js'
import {ROOT, SERVER} from 'config/paths'
import {isomorphicTools, isomorphicPlugin} from 'server/isomorphicTools'

if(isDevMode()) {
  isomorphicTools.development()
  isomorphicPlugin.development()
  hotReload(app)
  isomorphicTools.server(ROOT, () => {
    app.use(function *() {
      const {router, setRoutes} = require(`${SERVER}/router`)
      setRoutes()
      yield router.routes()
    })
  })
} else {
  const staticPart = koaStatic(path.join(__dirname, '../../public'))
  app.use(mount('/static', staticPart))
  const {router, setRoutes} = require(`${SERVER}/router`)
  setRoutes()
  app.use(router.routes())
}

app.listen(3000)
