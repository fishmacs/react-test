import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
//import createLogger from 'redux-logger'

export const saga = createSagaMiddleware()

export const middlewares = [
  thunk,
  promiseMiddleware(),
  saga,
  //createLogger()
]
