import React from 'react'
import Link from 'gatsby-link'
import 'react-simple-flex-grid/lib/main.css'
import { Row, Col } from 'react-simple-flex-grid'
import H1 from '../components/styled/H1'
import { StyledLink } from '../components/styled/StyledLink'

import styled from 'styled-components'
import colors from '../utils/colors'

const ProductCardContainer = styled.div`
  border: 2px solid ${colors.grey};
`
const ProductCardImage = styled.img``

const ProductCardInfo = styled.div`
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.6rem;
`

const ProductTitle = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.8rem;
  font-weight: lighter;
`

const ProductPrice = styled.p`
  color: ${colors.main};
  font-size: 1.3rem;
`

const ProductCardFooter = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-weight: lighter;
  font-size: 0.9rem;
  background-color: ${colors.grey};
`

const Products = ({ data }) => (
  <div>
    <H1 underlined>Products</H1>
    <Row gutter={40}>
      {data.allProducts.edges.map(({ node }) => (
        <Col span={4} key={node.id}>
          <ProductCardContainer>
            <ProductCardImage src={'https://picsum.photos/500?random'} />
            <StyledLink to={node.slug}>
              <ProductCardInfo>
                <ProductTitle>{node.name}</ProductTitle>
                <ProductPrice>${node.price}</ProductPrice>
              </ProductCardInfo>
            </StyledLink>
            <StyledLink to={node.slug}>
              <ProductCardFooter>
                <p>Details</p>
              </ProductCardFooter>
            </StyledLink>
          </ProductCardContainer>
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
