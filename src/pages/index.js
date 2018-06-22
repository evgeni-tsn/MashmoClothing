import React from 'react'
import H1 from '../components/styled/H1'

import { writeUserData } from '../services/firebase'
import FeaturedSection from '../components/FeaturedSection'
const IndexPage = ({ data }) => {
  console.log('index.js', data)
  return (
    <div>
      <H1 underlined>Hi people</H1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <button onClick={() => writeUserData('product1')}>Click</button>
      <FeaturedSection allProducts={data.allProducts} />
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    allProducts {
      edges {
        node {
          id
          name
          price
          slug
          quantity
          onSale
          onSalePrice
          featured
        }
      }
    }
  }
`

export default IndexPage
