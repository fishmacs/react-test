import { Route, IndexRoute } from 'react-router'

import { Demo } from 'app/demo'
import { RouteTest, About, Inbox, Message, Dashboard } from 'app/route-test'
import routeTestRoutes from 'app/route-test'
import blogRoutes from 'app/blog'
import ryfRoutes from 'app/ryf'

function routes() {
  return (
    <Route path='/' component={Demo}>
      {routeTestRoutes}
      {blogRoutes}
      {ryfRoutes}
    </Route>
  )
}

// export default (
//   <Route path='/' component={Demo}>
//     {routeTestRoutes}
//     {blogRoutes}
//   </Route>
// )

export default routes

