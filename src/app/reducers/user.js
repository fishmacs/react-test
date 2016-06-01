import typeToReducer from 'type-to-reducer'

import {listState, delState, promiseReducer } from 'app/reducers/helper'
import {API_FETCH_USERLIST, API_DELETE_USER, API_FETCH_USERPROFILE} from 'app/action/westfall'

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

export const userListReducer = function() {
  // record id of API_DELETE_USER
  let delId
  return typeToReducer({
    [API_FETCH_USERLIST]: promiseReducer(listState, 'data'),
    [API_DELETE_USER]: {
      PENDING: (state, action) => {
        delId = action.payload.id
        return {
          ...state,
          pending: true
        }
      },
      REJECTED: (state, action) => ({
        ...state,
        error: action.payload
      }),
      FULFILLED: (state, action) => {
        if(action.payload.result === 'ok') {
          return {
            ...state,
            data: state.data.filter(user => user.id !== delId)
          }
        }
      }
    }
  }, listState)
}()

const profileState = {
  data: {
    repos: []
  },
  error: false,
  pending: false
}

export const userProfileReducer = typeToReducer({
  [API_FETCH_USERPROFILE]: promiseReducer(profileState, 'data')
}, profileState)
