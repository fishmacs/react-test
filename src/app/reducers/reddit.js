import {SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, RECEIVE_POSTS, REQUESTING_POSTS} from 'app/action/reddit'

export function selectedSubReddit(state='reactjs', action) {
  switch(action.type) {
  case SELECT_SUBREDDIT:
    return action.subreddit
  default: return state
  }
}

function getPosts(state={
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type) {
  case INVALIDATE_SUBREDDIT:
    return {
      ...state,
      didInvalidate: true,
    }
  case RECEIVE_POSTS:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    }
  case REQUESTING_POSTS:
    return {
      ...state,
      isFetching: true,
      didInvalidate: false
    }
  default:
    return state
  }
}

export function postsBySubReddit(state={}, action) {
  switch(action.type) {
  case INVALIDATE_SUBREDDIT:
  case RECEIVE_POSTS:
  case REQUESTING_POSTS:
    const subreddit = action.subreddit
    return {
      ...state,
      [subreddit]: getPosts(state[subreddit], action)
    }
  default:
    return state
  }
}
