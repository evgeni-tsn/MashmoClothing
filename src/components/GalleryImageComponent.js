import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import colors from '../utils/colors'

const GalleryGatsbyImage = styled(Img)`
  &:hover {
    cursor: pointer;
  }
`

export const GalleryImageComponent = ({ onClick, photo, margin, index }) => {
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
