import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

import articleReducer from './article'
import {userListReducer, userProfileReducer} from './user'
import {widgetListReducer, widgetDelReducer} from './widget'
import {searchReducer} from './search'
import {galleryReducer} from './gallery'
import {todoReducer, visibilityFilter} from './todo'
import {selectedSubReddit, postsBySubReddit} from './reddit'

export default combineReducers({
  article: articleReducer,
  user: userListReducer,
  profile: userProfileReducer,
  widget: widgetListReducer,
  widgetDelReducer,
  search: searchReducer,
  gallery: galleryReducer,
  todos: todoReducer,
  visibilityFilter,
  postsBySubReddit,
  selectedSubReddit
//  routing: routerReducer
})

// createReducer({}, {
//   [ActionTypes.ADD_TODO](state, action) {
//     ...
//   }
// })

function createReducer(initialState, handlers) {
  return function(state=initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
