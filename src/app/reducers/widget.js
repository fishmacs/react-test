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

export const widgetListReducer = function() {
  // record id of API_DELETE_WIDGET
  let delId
  return typeToReducer({
    [API_FETCH_WIDGETLIST]: promiseReducer(listState, 'data'),
    [API_DELETE_WIDGET]: {
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
            data: state.data.filter(widget => widget.id !== delId)
          }
        }
      }
    }
  }, listState)
}()
