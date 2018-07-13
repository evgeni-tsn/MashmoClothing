import React from 'react'
import styled from 'styled-components'
import H1 from '../components/styled/H1'
import QuantityButton from '../components/styled/QuantityButton'

import FeaturedSection from '../components/FeaturedSection'

import 'react-simple-flex-grid/lib/main.css'
import { Row, Col } from 'react-simple-flex-grid'

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
          savedItem.quantity =
            Number(this.state.quantityValue) + Number(savedItem.quantity)
        }
      }

      if (!updateQuantity)
        oldItems.push({ ...productData, quantity: this.state.quantityValue })

      localStorage.setItem('cart', JSON.stringify(oldItems))
      let cartItems = JSON.parse(localStorage.getItem('cart')).length || 0
      this.props.updateCartItemsCount(cartItems)
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

  changeMainImage(e) {
    this.setState({ mainImage: e.target.src })
  }

  render() {
    const {
      node: productData,
    } = this.props.data.allContentfulProduct.edges.find(
      ({ node }) => node.slug === this.props.pathContext.slug
    )
    const allProducts = this.props.data.allContentfulProduct
    return (
      <div>
        <Row justify={'center'}>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
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
          <Col span={6}>
            <H1 underlined>{productData.name}</H1>
            <h3>Price: {productData.price}</h3>
            <span>Quantity: </span>
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
            <p>Quantity {productData.updatedAt}</p>
            <br />
            <button
              disabled={
                this.state.quantityValue < this.state.minimumQuantity ||
                this.state.quantityValue > this.state.maximumQuantity
              }
              onClick={() => this.addToCart(productData)}
            >
              Add to Cart
            </button>
            {this.state.errorMsgShow && (
              <p>Quantity must be between 1 and 8 items.</p>
            )}
          </Col>
        </Row>
        <br />
        <FeaturedSection filterOut={productData} allProducts={allProducts} />
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
          quantity
          contentful_id
          createdAt
          updatedAt
          photos {
            id
            resolutions(width: 600, height: 600) {
              src
              tracedSVG
            }
          }
        }
      }
    }
  }
`
