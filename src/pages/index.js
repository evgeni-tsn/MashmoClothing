import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'

import { ProductCard, FeaturedSection } from '../components'
import { FeaturedButtonLink } from '../components/styled'

const ProductListRow = styled(Row)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
`

const ExtendedCol = styled(Col)`
  @media only screen and (max-width: 576px) {
    display: block !important;
    width: 100% !important;
  }
`

const HomeFeaturedButtonLink = styled(FeaturedButtonLink)`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.1rem;
`

const IndexPage = ({ data }) => {
  // if (typeof window !== 'undefined') {
  //   fbq && fbq('track', 'PageView')
  // }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%',
        }}
      >
        <HomeFeaturedButtonLink to="/features">Фийчъри</HomeFeaturedButtonLink>
        <HomeFeaturedButtonLink to="/products">Продукти</HomeFeaturedButtonLink>
      </div>
    </div>
  )
}

export default IndexPage
