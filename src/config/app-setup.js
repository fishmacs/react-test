import 'config/environment'
import router from 'server/router'
import { isDevMode } from 'app/utils'
import hotReload from 'app/utils/hot-reload'

export default function(app) {
  if(isDevMode())
    hotReload(app)
  app.use(router.routes())
}
