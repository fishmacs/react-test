import { Route, IndexRoute } from 'react-router'

import { Demo } from 'app/demo'
import { RouteTest, About, Inbox, Message, Dashboard } from 'app/route-test'
import routeTestRoutes from 'app/route-test'
import blogRoutes from 'app/blog'
import ryfRoutes from 'app/ryf'
import wfRoutes from 'app/westfall'
import galleryRoutes from 'app/imageGallery.js'
import todoRoutes from 'app/todoList.js'
import redditRoutes from 'app/reddit.js'

// function routes() {
//   return (
//     <Route path='/' component={Demo}>
//       {routeTestRoutes}
//       {blogRoutes}
//       {ryfRoutes}
//       {wfRoutes}
//       {galleryRoutes}
//       {todoRoutes}
//       {redditRoutes}
//     </Route>
//   )
// }

export default (
  <Route path='/' component={Demo}>
    {routeTestRoutes}
    {blogRoutes}
    {ryfRoutes}
    {wfRoutes}
    {galleryRoutes}
    {todoRoutes}
    {redditRoutes}
  </Route>
)

//export default routes

