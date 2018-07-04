import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'

import Img from 'gatsby-image'

const GalleryGatsbyImage = styled(Img)`
  &:hover {
    cursor: pointer;
  }
`

const GalleryImageComponent = ({ onClick, photo, margin, index }) => {
  return (
    <div
      style={{ display: 'inline-block' }}
      onClick={e => onClick(e, { index, photo })}
    >
      <GalleryGatsbyImage
        resolutions={{
          height: photo.height,
          width: photo.width,
          src: photo.src,
          tracedSVG: photo.tracedSVG,
        }}
        alt={photo.alt}
        style={{
          width: photo.width,
          height: photo.height,
          margin: margin,
          border: `2px solid ${colors.darkGrey}`,
          borderRadius: '3px',
        }}
        outerWrapperClassName={'galleryOuterImages'}
      />
    </div>
  )
}

export default GalleryImageComponent
