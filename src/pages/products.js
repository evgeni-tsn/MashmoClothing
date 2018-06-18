import React from 'react'
import Link from 'gatsby-link'
import 'react-simple-flex-grid/lib/main.css'
import { Row, Col } from 'react-simple-flex-grid'

const Products = ({ data }) => (
  <div>
    <h1>Products</h1>
    <Row gutter={40}>
      {data.allProducts.edges.map(({ node }) => (
        <Col span={6} key={node.id}>
          <div style={{ border: '1px solid black', marginBottom: 20 }}>
            <h3>{node.name}</h3>
            <p>Price: {node.price}</p>
            <Link to={node.slug}>URL: {node.slug}</Link>
          </div>
        </Col>
      ))}
    </Row>
  </div>
)

export default Products

export const query = graphql`
  query ProductsPageQuery {
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
