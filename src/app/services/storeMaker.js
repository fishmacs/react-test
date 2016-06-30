import { createStore, applyMiddleware } from 'redux'

export default function(middlewares) {
  return applyMiddleware(...middlewares)(createStore)
}
