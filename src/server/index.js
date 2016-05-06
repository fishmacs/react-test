import koa from 'koa'
import koaStatic from 'koa-static'
import session from 'koa-generic-session'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
//import view from 'koa-views'

import config from 'config/app-setup'

const app = koa()
app.use(compress())
app.use(logger())
app.use(session())
app.use(bodyParser())
app.use(koaStatic('./public'))
config(app)

export default app
