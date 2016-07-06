import {Route} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CSSModule from 'react-css-modules'

import * as actions from 'app/action/gallery'
import styles from 'app/styles/gallery.css'

@connect(
  state => ({
    images: state.gallery.images,
    selectedImage: state.gallery.selectedImage
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
@CSSModule(styles)
class ImageGallery extends React.Component {
  componentDidMount() {
    this.props.loadImages()
  }

  render() {
    const {images, selectImage, selectedImage} = this.props
    return (
      <div styleName='image-gallery' hidden={!selectedImage}>
        <GalleryImage image={selectedImage} />
        <GalleryThumbs selectImage={selectImage} images={images} />
      </div>
    )
  }
}

// Route component(or, the decoration?) must be defined above,
// otherwise it is just blank(undefined).
// if the component is just a function, it would be hoisted wherever it defined,
// so can be seened by <Route...>
export default (
    <Route path='gallery' component={ImageGallery} />
)

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
