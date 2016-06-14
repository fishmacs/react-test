import {takeLatest} from 'redux-saga'
import {call, put, take, fork, select} from 'redux-saga/effects'

import {fetchImages} from 'app/api/flickr'
import {LOAD_IMAGES, SELECT_IMAGE, IMAGES_RECEIVED, LOAD_IMAGES_FAILURE} from 'app/action/gallery'

import {fetch} from 'app/utils'
import {receivePosts, requestingPosts, REQUEST_POSTS} from 'app/action/reddit'

export function *loadImages() {
  try {
    const images = yield call(fetchImages)
    yield put({type: IMAGES_RECEIVED, images})
    yield put({type: SELECT_IMAGE, image: images[0]})
  } catch(err) {
    yield put({type: LOAD_IMAGES_FAILURE, err})
  }
}

export function *watchLoad() {
  while(true) {
    const action = yield take([LOAD_IMAGES, REQUEST_POSTS])
    if(action.type === LOAD_IMAGES)
      yield fork(loadImages)
    else if(action.type === REQUEST_POSTS)
      yield fork(fetchPosts, action)
  }
  // yield* takeLatest(LOAD_IMAGES, loadImages)
  // yield* takeLatest(REQUEST_POSTS, fetchPosts)
}

export function *fetchPosts(action) {
  const {subreddit} = action
  if (shouldFetchPosts(yield select(), subreddit)) {
    yield put(requestingPosts(subreddit))
    try {
      const posts = yield fetch(`http://www.reddit.com/r/${subreddit}.json`)
      yield put(receivePosts(subreddit, posts))
    } catch(err) {}
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubReddit[subreddit]
  if(!posts) {
    return true
  } else if(posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}
