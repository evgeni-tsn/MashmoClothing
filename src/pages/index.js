import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'

import { ProductCard, FeaturedSection } from '../components'
import { FeaturedButtonLink } from '../components/styled'

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media only screen and (max-width: 576px) {
    display: block !important;
  }
`

const HomeFeaturedButtonLink = styled(FeaturedButtonLink)`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.1rem;
  text-align: center;
  @media only screen and (max-width: 576px) {
    display: block !important;
    width: 80% !important;
    margin: 0 auto;
    margin-top: 0.5rem;
  }
`

const IndexPage = ({ data }) => {
  // if (typeof window !== 'undefined') {
  //   fbq && fbq('track', 'PageView')
  // }

  return (
    <ButtonsRow>
      <HomeFeaturedButtonLink to="/features">Фийчъри</HomeFeaturedButtonLink>
      <HomeFeaturedButtonLink to="/products">Продукти</HomeFeaturedButtonLink>
    </ButtonsRow>
  )
}

export default IndexPage
