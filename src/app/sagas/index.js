import {takeLatest} from 'redux-saga'
import {call, put} from 'redux-saga/effects'

import {fetchImages} from 'app/api/flickr'
import {LOAD_IMAGES, SELECT_IMAGE, IMAGES_RECEIVED, LOAD_IMAGES_FAILURE} from 'app/action/gallery'

export function *loadImages() {
  try {
    const images = yield call(fetchImages)
    yield put({type: IMAGES_RECEIVED, images})
    yield put({type: SELECT_IMAGE, image: images[0]})
  } catch(err) {
    yield put({type: LOAD_IMAGES_FAILURE, err})
  }
}

export function *watchLoadImages() {
  // while(true) {
  //   yield take(LOAD_IMAGES)
  //   yield call(loadImages)
  // }
  yield* takeLatest(LOAD_IMAGES, loadImages)
}
