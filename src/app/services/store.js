import { createStore, compose, applyMiddleware } from 'redux'
import reducers from 'app/reducers'

import middleware from 'app/services/middleware'

export default applyMiddleware(...middleware)(createStore)(reducers)
