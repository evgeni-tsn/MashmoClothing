import React from 'react'
import H1 from '../components/styled/H1'

import { writeUserData } from '../services/firebase'
const IndexPage = ({ data }) => (
  <div>
    <H1 underlined>Hi people</H1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <button onClick={() => writeUserData('product1')}>Click</button>
  </div>
)

export const query = graphql`
  query HomePageQuery {
    allProducts {
      edges {
        node {
          id
          name
          price
          slug
        }
      }
    }
  }
`

export default IndexPage
