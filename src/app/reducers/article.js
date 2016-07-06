import typeToReducer from 'type-to-reducer'
import { API_FETCH_ARTICLES } from 'app/action/blog'

const initialState = {
  isPending: false,
  error: false,
  data: [],
}

export default typeToReducer({
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
