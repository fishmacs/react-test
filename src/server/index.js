import path from 'path'
import koa from 'koa'
import mount from 'koa-mount'
import session from 'koa-generic-session'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
//import view from 'koa-views'

const app = koa()
app.use(compress())
app.use(logger())
app.use(session())
app.use(bodyParser())

export default app
