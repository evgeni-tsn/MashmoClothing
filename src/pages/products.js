import React from 'react'
import 'react-simple-flex-grid/lib/main.css'
import { Row, Col } from 'react-simple-flex-grid'
import styled from 'styled-components'

import ProductCard from '../components/ProductCard'
import FeaturedSection from '../components/FeaturedSection'

const ProductListRow = styled(Row)`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
`
class Products extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Row>
          <Col span={2}>Cat1</Col>
          <Col span={2}>Cat2</Col>
          <Col span={2}>Cat3</Col>
        </Row>
        <hr />

        <ProductListRow gutter={20}>
          {data.allContentfulProduct.edges.map(({ node }) => (
            <Col xs={12} sm={6} md={6} lg={4} xl={4} key={node.contentful_id}>
              <ProductCard productData={node} />
            </Col>
          ))}
        </ProductListRow>
        <FeaturedSection allProducts={data.allContentfulProduct} />
      </div>
    )
  }
}

export default Products

export const query = graphql`
  query ProductsPageQuery {
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
            sizes(maxWidth: 800, quality: 80) {
              src
              tracedSVG
            }
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
