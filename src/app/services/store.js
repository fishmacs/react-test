import { createStore, compose, applyMiddleware } from 'redux'

import reducers from 'app/reducers'
import {middlewares, saga} from 'app/services/middleware'
import {watchLoadImages} from 'app/sagas'

export default applyMiddleware(...middlewares)(createStore)(reducers)

saga.run(watchLoadImages)
