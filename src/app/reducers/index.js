import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { articleReducer } from './article'

export default combineReducers({
  article: articleReducer,
  routing: routerReducer
})
