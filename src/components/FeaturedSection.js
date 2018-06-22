import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import ProductCard from './ProductCard'

const FeaturedProductListRow = styled(Row)`
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 1rem;
`
const FeaturedSection = ({ allProducts }) => {
  let getFirst3Featured = allProducts =>
    allProducts.edges.filter(({ node }) => node.featured === true).slice(0, 3)

  return (
    <div>
      <h2>Recommended</h2>
      <hr />
      <FeaturedProductListRow gutter={20}>
        {getFirst3Featured(allProducts).map(({ node }) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={4} key={node.id}>
            <ProductCard productData={node} />
          </Col>
        ))}
      </FeaturedProductListRow>
    </div>
  )
}

export default FeaturedSection
