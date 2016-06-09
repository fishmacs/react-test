import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

export const saga = createSagaMiddleware()

export const middlewares = [
  thunk,
  promiseMiddleware(),
  saga
]
