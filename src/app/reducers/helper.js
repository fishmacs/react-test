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

export function promiseReducer(initialState, dataKey='', dataFunc=identity) {
  return {
    // PENDING's data is undefined in state argument,
    // so use initialState
    PENDING: () => ({
      ...initialState,
      pending: true
    }),
    // REJECTED's data is undefined in state argument,
    // so use initialState
    REJECTED: (state, action) => ({
      ...initialState,
      error: action.payload
    }),
    FULFILLED: (state, action) => {
      let newState = Object.assign({}, initialState)
      if (dataKey) {
        if (!action.payload.data)
          newState.error = 'Error format!'
        else
          newState[dataKey] = dataFunc(action.payload.data)
      }
      return newState
    }
  }
}
