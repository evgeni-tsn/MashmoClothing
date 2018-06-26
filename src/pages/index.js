import React from 'react'
import H1 from '../components/styled/H1'

import FeaturedSection from '../components/FeaturedSection'

import { tryContentfulAPI, createOrder } from '../services/contentfulManagement'

const IndexPage = ({ data }) => {
  return (
    <div>
      <H1 underlined>Hi people</H1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <button onClick={() => createOrder()}>Click</button>
      <FeaturedSection allProducts={data.allContentfulProduct} />
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    allContentfulProduct {
      edges {
        node {
          slug
          name
          featured
          onSale
          onSalePrice
          price
          quantity
          contentfulid
          contentful_id
          createdAt
          mainImages {
            id
            resolutions(width: 800, quality: 80) {
              src
              tracedSVG
            }
          }
        }
      }
    }
  }
`

export default IndexPage
