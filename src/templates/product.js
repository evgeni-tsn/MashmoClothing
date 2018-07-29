import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import {
  FeaturedSection,
  Toast,
  SizesButtonGroup,
  QuantityControls,
} from '../components'
import { H1, GhostButtonLink, FeaturedButton } from '../components/styled'

import colors from '../utils/colors'
import { totalAvailableQuantity } from '../utils/utilFunctions'

const Image = styled.img`
  max-width: 300px;
`
const SmallImage1 = styled.img`
  max-width: 145px;
  &:hover {
    cursor: pointer;
  }
`
const SmallImage2 = styled(SmallImage1)`
  margin-left: 10px;
`

const ErrorMsg = styled.p`
  color: ${colors.red};
`

const FreeDeliveryMsg = styled.p`
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  color: ${colors.main};
`

const DescriptionMsg = styled.p`
  max-width: 20rem;
`

const P = styled.p`
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`

const ProductPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

const ProductPrice = styled.h3`
  color: ${({ crossout }) => (crossout ? colors.darkGrey : colors.main)};
  padding-right: 1rem;
  margin-top: 0.7rem;
  text-decoration: ${({ crossout }) => (crossout ? 'line-through' : 'none')};
  font-size: ${({ crossout }) => (crossout ? '1.5rem' : '2rem')};
  font-weight: 400;
`

class ProductTemplate extends React.Component {
  state = {
    quantityValue: 1,
    minimumQuantity: 1,
    maximumQuantity: 8,
    disableMinusButton: true,
    disablePlusButton: false,
    errorMsgShow: false,
    mainImage: '',
    sizeChoice: '',
    displayError: false,
  }

  componentDidMount() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )
    this.setState({ mainImage: productData.photos[0].resolutions.src })
  }

  addToCart = productData => {
    if (!this.checkDisabledSubmit()) {
      this.setState({ displayError: false })
      if (typeof window !== 'undefined' && window.localStorage) {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let updateQuantity = false
        for (const savedItem of oldItems) {
          if (
            savedItem.contentful_id === productData.contentful_id &&
            savedItem.selectedSize === this.state.sizeChoice
          ) {
            updateQuantity = true
            savedItem.quantity =
              Number(this.state.quantityValue) + Number(savedItem.quantity)
          }
        }

        if (!updateQuantity)
          oldItems.push({
            contentful_id: productData.contentful_id,
            name: productData.name,
            price: productData.isOnSale
              ? productData.onSalePrice
              : productData.price,
            slug: productData.slug,
            quantity: this.state.quantityValue,
            selectedSize: this.state.sizeChoice,
          })

        localStorage.setItem('cart', JSON.stringify(oldItems))
        let cartItems = JSON.parse(localStorage.getItem('cart')).length || 0
        this.props.updateCartItemsCount(cartItems)
        this.successAddedItemToast()
      }
    } else {
      this.setState({ displayError: true })
    }
  }

  checkOutOfQuantityRange() {
    Number(this.state.quantityValue) <= this.state.minimumQuantity
      ? this.setState({ disableMinusButton: true })
      : this.setState({ disableMinusButton: false })
    Number(this.state.quantityValue) < this.state.minimumQuantity
      ? this.setState({ errorMsgShow: true })
      : this.setState({ errorMsgShow: false })
    Number(this.state.quantityValue) >= this.state.maximumQuantity
      ? this.setState({ disablePlusButton: true })
      : this.setState({ disablePlusButton: false })
    Number(this.state.quantityValue) > this.state.maximumQuantity
      ? this.setState({ errorMsgShow: true })
      : this.setState({ errorMsgShow: false })
  }

  decreaseQuantity() {
    this.setState(
      currState => {
        quantityValue: currState.quantityValue -= 1
      },
      () => this.checkOutOfQuantityRange()
    )
  }

  increaseQuantity() {
    this.setState(
      currState => {
        quantityValue: currState.quantityValue += 1
      },
      () => this.checkOutOfQuantityRange()
    )
  }

  //TODO: Maybe we can display a little info for the product itself
  successAddedItemToast = () =>
    toast(
      () => (
        <div style={{ color: colors.white }}>
          <div>Продуктът беше добавен! 😎</div>
          <Link style={{ color: colors.white }} to="/cart">
            Виж количка
          </Link>
        </div>
      ),
      { className: 'gold-background' }
    )

  changeMainImage(e) {
    this.setState({ mainImage: e.target.src })
  }

  showAvailableSizes(sizes) {
    let availableSizes = {}
    for (const key in sizes) {
      if (sizes[key] !== null && sizes[key] !== 0)
        availableSizes[key] = sizes[key]
    }
    return Object.keys(availableSizes)
  }

  updateSizeSelection(e) {
    this.setState({ sizeChoice: e.id, displayError: false })
  }

  checkDisabledSubmit() {
    return (
      this.state.quantityValue < this.state.minimumQuantity ||
      this.state.quantityValue > this.state.maximumQuantity ||
      this.state.sizeChoice === ''
    )
  }

  render() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )
    const totalQuantity = totalAvailableQuantity(productData.sizes)
    const availableSizes = this.showAvailableSizes(productData.sizes)
    const allProducts = this.props.data.allContentfulProduct
    return (
      <div>
        <Row justify={'center'}>
          <Col xs={12} sm={12} md={6} lg={5} xl={5}>
            <Row justify={'center'}>
              <Col offset={2} span={8}>
                <Image src={this.state.mainImage} />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col offset={2} span={8}>
                <SmallImage1
                  onClick={e => this.changeMainImage(e)}
                  src={productData.photos[0].resolutions.src}
                />
                <SmallImage2
                  onClick={e => this.changeMainImage(e)}
                  src={productData.photos[1].resolutions.src}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={7} xl={7}>
            <H1>{productData.name}</H1>
            <DescriptionMsg>{productData.description}</DescriptionMsg>
            <ProductPriceWrapper>
              <ProductPrice crossout={totalQuantity === 0}>
                {productData.onSalePrice && productData.onSalePrice}лв.
              </ProductPrice>
              {productData.isOnSale &&
                productData.onSalePrice &&
                totalQuantity !== 0 && (
                  <ProductPrice crossout={true}>
                    {productData.price}лв.
                  </ProductPrice>
                )}
            </ProductPriceWrapper>
            <FreeDeliveryMsg>Безплатна доставка</FreeDeliveryMsg>
            {/* TODO: Display product label and hide size if no quantity */}
            {/* TODO: Disable button and error for no quantity */}
            <P>Размер</P>
            <SizesButtonGroup
              sizes={availableSizes}
              selected={this.state.sizeChoice}
              onChange={e => this.updateSizeSelection(e)}
            />
            <P>Количество</P>
            <QuantityControls
              decreaseTrigger={() => this.decreaseQuantity()}
              increaseTrigger={() => this.increaseQuantity()}
              disableMinusButton={this.state.disableMinusButton}
              disablePlusButton={this.state.disablePlusButton}
              value={this.state.quantityValue}
            />
            <br />
            <FeaturedButton
              grayedOut={!this.state.sizeChoice}
              onClick={() => this.addToCart(productData)}
            >
              Добави в количката
            </FeaturedButton>
            {this.state.displayError && (
              <ErrorMsg>Моля изберете размер</ErrorMsg>
            )}
            {this.state.errorMsgShow && (
              <p>Броя артикули може да е между 1 и 8.</p>
            )}
          </Col>
        </Row>
        <br />
        {/* <FeaturedSection filterOut={productData} allProducts={allProducts} /> */}
        <Toast />
      </div>
    )
  }
}

export default ProductTemplate

export const productQuery = graphql`
  query ProductQuery {
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
          contentful_id
          createdAt
          updatedAt
          photos {
            id
            resolutions(width: 500, height: 500) {
              src
              tracedSVG
            }
          }
          sizes {
            XS
            S
            M
            L
            XL
            OneSize
          }
        }
      }
    }
  }
`
