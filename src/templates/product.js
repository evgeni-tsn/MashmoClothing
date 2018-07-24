import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

import { FeaturedSection, Toast } from '../components'
import {
  H1,
  QuantityButton,
  GhostButtonLink,
  FeaturedButton,
} from '../components/styled'

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

const PriceTag = styled.h3`
  margin-top: 0.7rem;
  font-size: 2rem;
  font-weight: 400;
  color: ${colors.main};
`

const FreeDeliveryMsg = styled.p`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
  color: ${colors.main};
`

const DescriptionMsg = styled.p`
  max-width: 20rem;
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
    //TODO: Diferentiate the Sizes of each product
    if (typeof window !== 'undefined' && window.localStorage) {
      let oldItems = JSON.parse(localStorage.getItem('cart')) || []
      let updateQuantity = false
      //TODO: Add only needed data not all (remove images for ex.)
      for (const savedItem of oldItems) {
        if (savedItem.contentful_id === productData.contentful_id) {
          updateQuantity = true
          savedItem.addedQuantity =
            Number(this.state.quantityValue) + Number(savedItem.addedQuantity)
        }
      }

      if (!updateQuantity)
        oldItems.push({
          ...productData,
          addedQuantity: this.state.quantityValue,
        })

      localStorage.setItem('cart', JSON.stringify(oldItems))
      let cartItems = JSON.parse(localStorage.getItem('cart')).length || 0
      this.props.updateCartItemsCount(cartItems)
      this.successAddedItemToast()
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
    toast(() => (
      <div>
        <div style={{ color: colors.black }}>
          Продуктът беше добавен в количката! 😎
        </div>
        <Link to="/cart">Виж количка</Link>
      </div>
    ))

  changeMainImage(e) {
    this.setState({ mainImage: e.target.src })
  }

  showAvailableSizes(sizes) {
    let availableSizes = {}
    for (const key in sizes) {
      if (sizes[key] !== null && sizes[key] !== 0)
        availableSizes[key] = sizes[key]
    }
    return Object.keys(availableSizes).map(function(key) {
      return <li key={key}>{key + ' ' + availableSizes[key]}</li>
    })
  }

  render() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )
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
            <PriceTag>{productData.price}лв.</PriceTag>
            <FreeDeliveryMsg>Безплатна доставка</FreeDeliveryMsg>
            <p>Размер:</p>
            <ul>{availableSizes}</ul>
            <p>Количество:</p>
            <QuantityButton
              onClick={() => this.decreaseQuantity()}
              disabled={this.state.disableMinusButton}
            >
              -
            </QuantityButton>
            <span>{this.state.quantityValue}</span>
            <QuantityButton
              onClick={() => this.increaseQuantity()}
              disabled={this.state.disablePlusButton}
            >
              +
            </QuantityButton>
            <br />
            <br />
            <FeaturedButton
              disabled={
                this.state.quantityValue < this.state.minimumQuantity ||
                this.state.quantityValue > this.state.maximumQuantity
              }
              onClick={() => this.addToCart(productData)}
            >
              Добави в количката
            </FeaturedButton>
            {this.state.errorMsgShow && (
              <p>Quantity must be between 1 and 8 items.</p>
            )}
            <br />
            {/* <br />
            <GhostButtonLink to="/cart" style={{ fontSize: '1rem' }}>
              Виж количката
            </GhostButtonLink> */}
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
