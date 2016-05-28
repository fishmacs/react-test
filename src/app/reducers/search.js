import typeToReducer from 'type-to-reducer'

import {LOAD_SEARCH_LAYOUT} from 'app/action/westfall'

const initialState = {
  searchType: '',
  title: ''
}

export const searchReducer = typeToReducer({
  [LOAD_SEARCH_LAYOUT]: (state, action) => ({
    searchType: action.searchType,
    title: action.title
  })
}, initialState)

