import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Measure from 'react-measure'
import styled from 'styled-components'

import { StyledLink } from './styled'

import colors from '../utils/colors'
import { totalAvailableQuantity } from '../utils/utilFunctions'

const ProductCardContainer = styled.div`
  border: 2px solid ${colors.grey};
  margin-bottom: 2rem;
`
const ProductCardImage = styled(Img)`
  filter: ${({ crossout }) => (crossout ? 'grayscale(80%)' : 'none')};
  transition: 1s ease-in-out;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
  position: inherit !important;

  &:hover {
    transform: scale(1.3);
    transition: 1s ease-in-out;
    opacity: 0;
  }
`

const ProductImageWrapper = styled.figure`
  overflow: hidden;
  position: relative;
  height: 300px;

  & > div {
    position: absolute !important;
    top: 0;
    width: 100%;
    height: 100%;
  }
  & > div:nth-child(odd) {
    background-color: ${colors.white};
    transition: 1s ease-in-out;
    z-index: 99;
    &:hover {
      background-color: transparent;
      transition: 1s ease-in-out;
    }
  }

  & > div:nth-child(even) {
    z-index: 0;
  }
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
  font-size: 1.5rem;
  font-weight: lighter;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
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

const Label = styled.div`
  position: absolute;
  z-index: 998;
  text-align: center;
  padding: 0.6rem 0;
  font-size: 1.2rem;
  font-weight: 300;
  opacity: 0.9;
`

const SaleLabel = Label.extend`
  color: ${colors.white};
  background-color: ${colors.main};
`

const OutOfStockLabel = Label.extend`
  color: ${colors.white};
  background-color: ${colors.darkGrey};
`

const LimitedLabel = Label.extend`
  color: ${colors.white};
  background-color: ${colors.red};
`

export class ProductCard extends React.Component {
  state = {
    calculatedLabelWidth: 0,
  }
  render() {
    const { productData: node } = this.props
    const availableQuantity = totalAvailableQuantity(node.sizes)
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ calculatedLabelWidth: contentRect.bounds.width - 4 })
        }}
      >
        {({ measureRef }) => {
          const { calculatedLabelWidth } = this.state
          return (
            <div ref={measureRef}>
              <ProductCardContainer>
                <StyledLink to={node.slug}>
                  {node.isOnSale && (
                    <SaleLabel style={{ width: calculatedLabelWidth }}>
                      НАМАЛЕНО
                    </SaleLabel>
                  )}
                  {availableQuantity < 5 &&
                    availableQuantity > 0 && (
                      <LimitedLabel style={{ width: calculatedLabelWidth }}>
                        ПОСЛЕДНИ БРОЙКИ
                      </LimitedLabel>
                    )}
                  {availableQuantity <= 0 && (
                    <OutOfStockLabel style={{ width: calculatedLabelWidth }}>
                      ИЗЧЕРПАНО
                    </OutOfStockLabel>
                  )}
                  <ProductImageWrapper>
                    <ProductCardImage
                      crossout={availableQuantity === 0}
                      resolutions={node.photos[0].resolutions}
                    />
                    <ProductCardImage
                      crossout={availableQuantity === 0}
                      resolutions={node.photos[1].resolutions}
                    />
                  </ProductImageWrapper>
                  <ProductCardInfo>
                    <ProductTitle>{node.name}</ProductTitle>
                    <ProductPriceWrapper>
                      {node.isOnSale &&
                        node.onSalePrice.toFixed(2) &&
                        availableQuantity > 0 && (
                          <ProductPrice crossout={true}>
                            {node.price.toFixed(2)}лв.
                          </ProductPrice>
                        )}
                      <ProductPrice crossout={availableQuantity <= 0}>
                        {node.isOnSale
                          ? node.onSalePrice.toFixed(2)
                          : node.price.toFixed(2)}лв.
                      </ProductPrice>
                    </ProductPriceWrapper>
                  </ProductCardInfo>
                </StyledLink>
                <StyledLink to={node.slug}>
                  <ProductCardFooter>
                    <p>Детайли</p>
                  </ProductCardFooter>
                </StyledLink>
              </ProductCardContainer>
            </div>
          )
        }}
      </Measure>
    )
  }
}

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
}
