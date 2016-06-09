export const LOAD_IMAGES = 'LOAD_IMAGES'
export const SELECT_IMAGE = 'SELECT_IMAGE'
export const IMAGES_RECEIVED = 'IMAGES_RECEIVED'
export const LOAD_IMAGES_FAILURE = 'LOAD_IMAGES_FAILURE'

export function selectImage(image) {
  return {type: SELECT_IMAGE, image}
}

export function loadImages() {
  return {type: LOAD_IMAGES}
}
