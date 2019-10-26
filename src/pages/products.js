import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import { ProductCard, FeaturedSection } from '../components'
import { GhostButtonLink, StyledLink } from '../components/styled'

const ProductListRow = styled(Row)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
`
const ProductOfTheWeekContainer = styled.div`
  display: flex;
  background-color: #dadada;
  margin: 1.5rem 0;
  padding: 1.5rem;
  border: 2px solid #bfa26e;
`

const SectionHeading = styled.h2``

const ExtendedCol = styled(Col)`
  @media only screen and (max-width: 576px) {
    display: block !important;
    width: 100% !important;
  }
`

class Products extends React.Component {
  getWeekNumber() {
    const now = new Date()
    const onejan = new Date(now.getFullYear(), 0, 1)
    const week = Math.ceil(
      ((now - onejan) / 86400000 + onejan.getDay() + 1) / 7
    )
    return week
  }
  render() {
    let weekNumber = this.getWeekNumber()
    const { data } = this.props
    const productsCount = data.allContentfulProduct.edges.length
    const productsOfTheWeekCount =
      data.allContentfulProductOfTheWeek.edges.length
    if (
      weekNumber < 1 ||
      weekNumber % productsOfTheWeekCount >= productsCount
    ) {
      weekNumber = 1
    }
    const productOfTheWeek = data.allContentfulProductOfTheWeek.edges.find(
      edge =>
        edge.node.week === weekNumber % productsOfTheWeekCount + 1 ? edge : null
    )
    return (
      <div>
        <StyledLink to={productOfTheWeek.node.product.slug}>
          <ProductOfTheWeekContainer>
            <img
              style={{ maxWidth: '150px' }}
              src={productOfTheWeek.node.product.photos[0].resolutions.src}
              alt={'Photo of the week'}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '2rem',
              }}
            >
              <h3 style={{ marginBottom: '1.5rem' }}>Продукт на седмицата</h3>
              <p>{productOfTheWeek.node.product.name}</p>
              {productOfTheWeek.node.product.isOnSale ? (
                <p>
                  {productOfTheWeek.node.product.price}лв. /{' '}
                  {productOfTheWeek.node.product.onSalePrice}лв.
                </p>
              ) : (
                <p>{productOfTheWeek.node.product.price}лв.</p>
              )}
            </div>
          </ProductOfTheWeekContainer>
        </StyledLink>

        <div>
          {this.props.data.allContentfulCategory.edges
            .sort((a, b) => a.node.contentfulid > b.node.contentfulid)
            .map(categoryNode => {
              const category = categoryNode.node
              return (
                <div key={category.contentfulid}>
                  <SectionHeading>{category.name}</SectionHeading>
                  <hr style={{ marginBottom: '0.5rem' }} />
                  <ProductListRow gutter={20} align={'middle'}>
                    {category.product.map(p => {
                      return (
                        <ExtendedCol
                          xs={6}
                          sm={6}
                          md={3}
                          lg={3}
                          xl={3}
                          key={p.contentful_id}
                        >
                          <ProductCard productData={p} />
                        </ExtendedCol>
                      )
                    })}
                  </ProductListRow>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

export default Products
