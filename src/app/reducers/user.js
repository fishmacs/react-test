import typeToReducer from 'type-to-reducer'

import {listState, delState, promiseReducer } from 'app/reducers/helper'
import {API_FETCH_UERLIST, API_DELETE_USER, API_FETCH_USERPROFILE} from 'app/action/westfall'

// export const listState = {
//   data: [],
//   error: false,
//   pending: false
// }

// export const delState = {
//   id: '',
//   error: false,
//   pending: false
// }

export const userListReducer = typeToReducer({
  [API_FETCH_UERLIST]: promiseReducer(listState, 'data'),
}, listState)

export const userDelReducer = typeToReducer({
  [API_DELETE_USER]: promiseReducer(delState)
}, delState)


const profileState = {
  profile: {
    repos: []
  },
  error: false,
  pending: false
}

export const profileReducer = typeToReducer({
  [API_FETCH_USERPROFILE]: promiseReducer(profileState)
}, profileState)
