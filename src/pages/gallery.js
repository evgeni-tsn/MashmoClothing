import React from 'react'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import PhotoGallery from 'react-photo-gallery'

import { GalleryImageComponent } from '../components'

import colors from '../utils/colors'
import { theme } from '../utils/lightboxTheme'

class Gallery extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0, width: -1 }
  }

  componentDidMount() {
    this.photos = this.props.data.allContentfulGallery.edges[0].node.photos.map(
      e => {
        return {
          height: e.resolutions.height,
          width: e.resolutions.width,
          src: e.resolutions.src,
          srcSet: e.resolutions.srcSet.split(',\n'),
          tracedSVG: e.resolutions.tracedSVG,
          alt: e.title,
        }
      }
    )
  }
  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const width = this.state.width
    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) return <div ref={measureRef} />
          let columns = 1
          if (width >= 480) columns = 2
          if (width >= 1024) columns = 3
          if (width >= 1824) columns = 4
          return (
            <div ref={measureRef}>
              <PhotoGallery
                photos={this.photos}
                columns={columns}
                onClick={this.openLightbox}
                margin={5}
                ImageComponent={GalleryImageComponent}
              />
              <Lightbox
                images={this.photos}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
                onClickImage={this.gotoNext}
                backdropClosesModal
                imageCountSeparator=" / "
                spinnerColor={colors.main}
                spinnerSize={150}
                theme={theme}
              />
            </div>
          )
        }}
      </Measure>
    )
  }
}

//TODO: Consider adding description of the images and use thar for alt tag
export const query = graphql`
  query GalleryPageQuery {
    allContentfulGallery {
      edges {
        node {
          photos {
            title
            resolutions(width: 800, quality: 50) {
              src
              tracedSVG
              srcSet
              width
              height
            }
          }
        }
      }
    }
  }
`

export default Gallery
