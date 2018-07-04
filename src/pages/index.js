import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import styled from 'styled-components'

import ProductCard from '../components/ProductCard'
import FeaturedSection from '../components/FeaturedSection'
import H1 from '../components/styled/H1'

const ProductListRow = styled(Row)`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
`

const IndexPage = ({ data }) => {
  return (
    <div>
      <FeaturedSection allProducts={data.allContentfulProduct} />
      <hr />
      <ProductListRow gutter={20} align={'middle'}>
        {data.allContentfulProduct.edges.map(({ node }) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={4} key={node.contentful_id}>
            <ProductCard productData={node} />
          </Col>
        ))}
      </ProductListRow>
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
          isFeatured
          isOnSale
          onSalePrice
          price
          quantity
          contentful_id
          createdAt
          photos {
            id
            resolutions(width: 600, height: 600) {
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
