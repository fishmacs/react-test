import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

import articleReducer from './article'
import {userListReducer, userProfileReducer} from './user'
import {widgetListReducer, widgetDelReducer} from './widget'
import {searchReducer} from './search'
import {galleryReducer} from './gallery'
import {todoReducer, visibilityFilter} from './todo'

export default combineReducers({
  article: articleReducer,
  user: userListReducer,
  profile: userProfileReducer,
  widget: widgetListReducer,
  widgetDelReducer,
  search: searchReducer,
  gallery: galleryReducer,
  todos: todoReducer,
  visibilityFilter
//  routing: routerReducer
})
