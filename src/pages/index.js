import React from 'react'
import Link from 'gatsby-link'
import { writeUserData } from '../services/firebase'
const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div>
      {data.allProducts.edges.map(({ node }) => (
        <div
          key={node.id}
          style={{ border: '1px solid black', marginBottom: 20 }}
        >
          <h3>{node.name}</h3>
          <p>{node.price}</p>
          <Link to={node.slug}>{node.slug}</Link>
        </div>
      ))}
    </div>
    <button onClick={() => writeUserData('product1')}>Click</button>
    <Link to="/page-2/">Go to page 2</Link>
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
