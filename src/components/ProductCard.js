import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '../utils/colors'
import { StyledLink } from './styled/StyledLink'

const ProductCardContainer = styled.div`
  border: 2px solid ${colors.grey};
  margin-bottom: 2rem;
`
const ProductCardImage = styled.img`
  filter: ${({ crossout }) => (crossout ? 'grayscale(80%)' : 'none')};
  transition: 0.7s ease-in-out;
  object-fit: cover;
  width: 300px;
  height: 300px;
  &:hover {
    transform: scale(1.3);
    transition: 0.7s ease-in-out;
    opacity: 0;
  }
`

const ProductSecondCardImage = styled(ProductCardImage)`
  position: absolute;
  left: 0;
`

const ProductImageWrapper = styled.figure`
  overflow: hidden;
  position: relative;
  height: 300px;
`

const ProductCardInfo = styled.div`
  margin-top: 0.6rem;
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
  color: ${({ crossout }) => (crossout ? colors.darkGrey : colors.main)};
  font-size: 1.3rem;
  font-weight: lighter;
  padding-left: 1rem;
  padding-right: 1rem;
  text-decoration: ${({ crossout }) => (crossout ? 'line-through' : 'none')};
`

const ProductPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductCardFooter = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-weight: lighter;
  font-size: 0.9rem;
  background-color: ${colors.grey};
`
class ProductCard extends React.Component {
  render() {
    const { productData: node } = this.props
    return (
      <ProductCardContainer>
        {/* TODO: Add taglabels (out of stock & limited & hotsale) */}
        <ProductImageWrapper>
          <ProductCardImage
            crossout={node.quantity === 0}
            src={node.mainImages[1].resolutions.src}
          />
          <ProductSecondCardImage
            crossout={node.quantity === 0}
            src={node.mainImages[0].resolutions.src}
          />
        </ProductImageWrapper>
        <StyledLink to={node.slug}>
          <ProductCardInfo>
            <ProductTitle>{node.name}</ProductTitle>
            <ProductPriceWrapper>
              {node.onSale &&
                node.onSalePrice && (
                  <ProductPrice crossout={true}>
                    ${node.onSalePrice}
                  </ProductPrice>
                )}
              <ProductPrice crossout={node.quantity === 0}>
                ${node.price}
              </ProductPrice>
            </ProductPriceWrapper>
          </ProductCardInfo>
        </StyledLink>
        <StyledLink to={node.slug}>
          <ProductCardFooter>
            <p>Details</p>
          </ProductCardFooter>
        </StyledLink>
      </ProductCardContainer>
    )
  }
}

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
}

export default ProductCard
