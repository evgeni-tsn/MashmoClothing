import React from 'react'
import PhotoGallery from 'react-photo-gallery'
import Measure from 'react-measure'
import Lightbox from 'react-images'
import colors from '../utils/colors'

// Add these props: https://github.com/jossmac/react-images
// src:
// srcSet:
// caption:
// alt:

//For image border see: https://www.npmjs.com/package/react-photo-gallery
//And create Custom Image Components

const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    width: 4,
    height: 3,
  },
]

const theme = {
  // container
  container: {
    background: colors.white,
  },

  // arrows
  arrow: {
    backgroundColor: colors.main,
    fill: colors.white,
    opacity: 0.8,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    margin: '0 0.5rem',
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },
  close: {
    fill: colors.black,
    opacity: 0.8,
    transition: 'all 200ms',
    ':hover': {
      opacity: 1,
    },
  },

  // footer
  footer: {
    color: colors.black,
  },
  footerCount: {
    color: colors.black,
  },

  // thumbnails
  thumbnail: {},
  thumbnail__active: {
    boxShadow: `0 0 0 2px ${colors.main}`,
  },
}

class Gallery extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0, width: -1 }
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
          if (width < 1) {
            return <div ref={measureRef} />
          }
          let columns = 1
          if (width >= 480) {
            columns = 2
          }
          if (width >= 1024) {
            columns = 3
          }
          if (width >= 1824) {
            columns = 4
          }
          return (
            <div ref={measureRef}>
              <PhotoGallery
                photos={photos}
                columns={columns}
                onClick={this.openLightbox}
                margin={5}
              />
              <Lightbox
                images={photos}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
                onClickImage={this.gotoNext}
                backdropClosesModal
                imageCountSeparator=" / "
                spinnerColor={colors.main}
                theme={theme}
              />
            </div>
          )
        }}
      </Measure>
    )
  }
}

export default Gallery
