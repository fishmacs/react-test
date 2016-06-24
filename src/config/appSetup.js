import 'config/environment'
import router from 'server/router'

export default function(app) {
  app.use(router.routes())
}
