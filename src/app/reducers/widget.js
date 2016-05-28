import typeToReducer from 'type-to-reducer'

import {listState, delState, promiseReducer} from 'app/reducers/helper'
import {API_FETCH_WIDGETLIST, API_DELETE_WIDGET} from 'app/action/westfall'

// const listState = {
//   data: [],
//   error: false,
//   pending: false
// }

// const delState = {
//   id: '',
//   error: false,
//   pending: false
// }

export const widgetListReducer = typeToReducer({
  [API_FETCH_WIDGETLIST]: promiseReducer(listState, 'data'),
}, listState)

export const widgetDelReducer = typeToReducer({
  [API_DELETE_WIDGET]: promiseReducer(delState)
}, delState)
