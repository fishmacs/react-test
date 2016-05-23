import typeToReducer from 'type-to-reducer'
import { API_FETCH_ARTICLES } from 'app/action/blog'

const initialState = {
  isPending: false,
  error: false,
  data: [],
}

export const articleReducer = typeToReducer({
  [ API_FETCH_ARTICLES ]: {
    PENDING: () => ({
      ...initialState,
      isPending: true
    }),
    REJECTED: (state, action) => ({
      ...initialState,
      error: action.payload
    }),
    FULFILLED: (state, action) => ({
      ...initialState,
      data: action.payload.data
    })
  }
}, initialState)

// export function articleReducer(state=initialState, action) {
//   console.log('wwww', action)
//   const newState = articleReducer1(state, action)
//   console.log('vvvv', newState)
//   return newState
// }
