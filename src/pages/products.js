import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import { ProductCard, FeaturedSection } from '../components'

const ProductListRow = styled(Row)`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
`

const ExtendedCol = styled(Col)`
  @media only screen and (max-width: 576px) {
    display: block !important;
    width: 100% !important;
  }
`

class Products extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div>
        {/* <Row>
          <Col span={2}>Cat1</Col>
          <Col span={2}>Cat2</Col>
          <Col span={2}>Cat3</Col>
        </Row>
        <hr /> */}

        <ProductListRow gutter={20} align={'middle'}>
          {data.allContentfulProduct.edges.map(({ node }) => (
            <ExtendedCol
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              key={node.contentful_id}
            >
              <ProductCard productData={node} />
            </ExtendedCol>
          ))}
        </ProductListRow>
        {/* <FeaturedSection allProducts={data.allContentfulProduct} /> */}
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
          isFeatured
          isOnSale
          onSalePrice
          price
          description
          sizes {
            XS
            S
            M
            L
            XL
            OneSize
          }
          contentful_id
          createdAt
          photos {
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
