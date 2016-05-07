import path from 'path'
import koa from 'koa'
import koaStatic from 'koa-static'
import mount from 'koa-mount'
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
const staticPart = koaStatic(path.join(__dirname, '../../public'))
app.use(mount('/static', staticPart))

config(app)

export default app
