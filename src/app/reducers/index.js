import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

import articleReducer from './article'
import {userListReducer, userProfileReducer} from './user'
import {widgetListReducer, widgetDelReducer} from './widget'
import {searchReducer} from './search'
import {galleryReducer} from './gallery'

export default combineReducers({
  article: articleReducer,
  user: userListReducer,
  profile: userProfileReducer,
  widget: widgetListReducer,
  widgetDelReducer,
  search: searchReducer,
  gallery: galleryReducer,
//  routing: routerReducer
})
