import koaStatic from 'koa-static'

import 'config/environment'
import './helpers/cssModulesHook'
import cleanAssetJson from './helpers/cleanAssetJson'
import app from 'server'
import { isDevMode } from 'app/utils'
//import config from 'config/appSetup'
import hotReload from './helpers/hotReload.js'
import {ROOT, SERVER} from 'config/paths'
import {isomorphicTools, isomorphicPlugin} from 'server/isomorphicTools'

if(isDevMode()) {
  //cleanAssetJson()
  isomorphicTools.development()
  isomorphicPlugin.development()
  hotReload(app)
  isomorphicTools.server(ROOT, () => {
    app.use(function *() {
      // reset routes every request
      const {router, setRoutes} = require(`${SERVER}/router`)
      setRoutes(isomorphicTools.assets())
      yield router.routes()
    })
  })
} else {
  const staticPart = koaStatic(path.join(__dirname, '../../public'))
  app.use(mount('/static', staticPart))
  const {router, setRoutes} = require(`${SERVER}/router`)
  setRoutes(isomorphicTools.assets())
  app.use(router.routes())
}

app.listen(3000)
