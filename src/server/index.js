import path from 'path'
import koa from 'koa'
import mount from 'koa-mount'
import koaStatic from 'koa-static'
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
const staticPart = koaStatic(path.join(__dirname, '../../public'))
app.use(mount('/static', staticPart))

export default app
