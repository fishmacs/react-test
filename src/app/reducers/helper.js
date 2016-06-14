import {identity} from 'ramda'

/* initial states can't be shared, data would be undefined */
export const listState = {
  data: [],
  error: false,
  pending: false
}

export const delState = {
  id: '',
  error: false,
  pending: false
}

export function promiseReducer(initialState, dataKey='', dataFunc=payload => payload.data) {
  return {
    // PENDING's data is undefined in state argument,
    // so use initialState
    PENDING: (state, action) => ({
      ...state,
      pending: true
    }),
    // REJECTED's data is undefined in state argument,
    // so use initialState
    REJECTED: (state, action) => ({
      ...state,
      error: action.payload
    }),
    FULFILLED: (state, action) => {
      let newState = Object.assign({}, state)
      if (dataKey) {
        if (!action.payload.data)
          newState.error = 'Error format!'
        else
          newState[dataKey] = dataFunc(action.payload)
      }
      return newState
    }
  }
}
