import {IMAGES_RECEIVED, LOAD_IMAGE_FAILURE, SELECT_IMAGE} from 'app/action/gallery'

export function galleryReducer(state={images: []}, action) {
  switch(action.type) {
  case IMAGES_RECEIVED:
    return {
      ...state,
      images: action.images
    }
  case LOAD_IMAGE_FAILURE:
    return state
  case SELECT_IMAGE:
    return {
      ...state,
      selectedImage: action.image
    }
  default:
    return state
  }
}
