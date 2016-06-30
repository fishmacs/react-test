import { createStore, applyMiddleware } from 'redux'
import { createMemoryHistory } from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import reducers from 'app/reducers'
import storeMaker from 'app/services/storeMaker'
import {middlewares} from 'app/services/middleware'

export default function *(next) {
  this.store = storeMaker(middlewares)(reducers, {})
  syncHistoryWithStore(createMemoryHistory(this.request.url), this.store)
  yield next
}
