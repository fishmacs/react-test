import {Route} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as actions from 'app/action/gallery'
import styles from 'app/styles/gallery'

export default (
  <Route path='gallery' component={ImageGallery} />
)

function ImageGallery() {
  return <Gallery />
}

@connect(
  state => ({
    images: state.gallery.images,
    selectedImage: state.gallery.selectedImage
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class Gallery extends React.Component {
  componentDidMount() {
    this.props.loadImages()
  }

  render() {
    const {images, selectImage, selectedImage} = this.props
    return (
      <div className={styles['image-gallery']} hidden={!selectedImage}>
        <GalleryImage image={selectedImage} />
        <GalleryThumbs selectImage={selectImage} images={images} />
      </div>
    )
  }
}

function GalleryImage({image}) {
  return (
    <div className={styles['gallery-image']}>
      <div>
        {image ? <img src={image} />: null}
      </div>
    </div>
  )
}

function GalleryThumbs({images, selectImage}) {
  return (
    <div className={styles['image-scroller']}>
      {images.map((image, index) => (
        <div key={index} onClick={selectImage.bind(this, image)}>
          <img src={image} />
        </div>
      ))}
    </div>
  )
}
