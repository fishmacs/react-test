import {RouterContext, match} from 'react-router'

export default function(routes) {
  return function *(next) {
    try {
      this.routeContext = yield getRouteContext(this, routes)
      yield next
    } catch(error) {
      if (error instanceof Error)
        throw error
    }
  }
}

function getRouteContext(ctx, routes) {
  return new Promise((resolve, reject) => {
    match(
      {routes, location: ctx.request.url},
      (error, redirect, renderProps) => {
        if(error) {
          ctx.status = 500
          reject(ctx.throw(error))
        } else if(redirect) {
          ctx.status = 302
          reject(ctx.redirect(redirect.pathname + redirect.search))
        } else if(!renderProps) {
          ctx.status = 404
          reject()
        } else {
          resolve(<RouterContext {...renderProps} />)
        }
      })
  })
}
