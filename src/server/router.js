import Router from 'koa-router'
import {Provider} from 'react-redux'
import {filter, identity} from 'ramda'

import path from 'path'
import sendfile from 'koa-sendfile'

import appRoutes from 'app/routes'
import apiRouter from 'server/api'
import {makeHtml} from 'server/html'
import setStore from 'server/middlewares/store'
import setRouteContext from 'server/middlewares/routeContext'

export const router = Router()

function compose(...middlewares) {
  if(!middlewares.length || middlewares.some(m => typeof m != 'function'))
    throw new TypeError('Compose requires middleware arguments')
  return function *(next) {
    yield middlewares.reduceRight((acc, m) => {
      return m.call(this, acc)
    }, next)
  }
}

function *demoClientRender() {
  const html = path.join(__dirname, '../views/index.html')
  yield sendfile(this, path.join(__dirname, '../views/index.html'))
}

function renderRouteContext(assets) {
  return function *() {
    this.body = makeHtml(this.store.getState(),
                         assets,
                         <Provider store={this.store}>
                           {this.routeContext}
                         </Provider>
                        )
  }
}

const compact = filter(identity)

export function setRoutes(assets) {
  router.stack.length = 0

  const assetMap = {
    headScripts: compact([assets.javascript.common, assets.javascript.head]),
    bodyScripts: compact([assets.javascript.body]),
    headStyles: compact([assets.styles.body, assets.styles.head]),
    bodyStyles: []
  }

  const renderApp = compose(
    setStore,
    setRouteContext(appRoutes()),
    renderRouteContext(assetMap)
  )

  router
    .use(apiRouter.routes())
    .get('demo', '/(.*)', renderApp/*demoClientRender*/)
}
