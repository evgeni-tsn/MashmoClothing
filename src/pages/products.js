import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import { ProductCard, FeaturedSection } from '../components'
import { GhostButtonLink } from '../components/styled'

const ProductListRow = styled(Row)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
`

const SectionHeading = styled.h2``

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
        {this.props.data.allContentfulCategory.edges
          .sort((a, b) => a.id > b.id)
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
    )
  }
}

export default Products
