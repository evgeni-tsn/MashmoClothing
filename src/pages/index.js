import React from 'react'
import H1 from '../components/styled/H1'

import FeaturedSection from '../components/FeaturedSection'

import { tryContentfulAPI } from '../services/contentfulManagement'

const IndexPage = ({ data }) => {
  return (
    <div>
      <H1 underlined>Hi people</H1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <button onClick={() => tryContentfulAPI()}>Click</button>
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
            resolutions(width: 500, height: 500) {
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
