import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-simple-flex-grid'
import '../utils/responsiveTablesCSS.css'

import { Toast, CartTable, TotalPriceContainer } from '../components'
import {
  Container,
  FeaturedButtonLink,
  H1,
  GhostButtonLink,
} from '../components/styled'

import colors from '../utils/colors'

const EmptyCartLabel = styled.h2`
  margin-top: 2rem;
  font-weight: 300;
  color: ${colors.darkGrey};
  text-align: center;
`

class Cart extends React.Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      })
    }
  }

  calculateTotal = cartItems => {
    return cartItems.reduce(
      (total, curr) => total + Number(curr.price * curr.quantity),
      0
    )
  }

  successRemovedItemToast = () =>
    toast(
      () => (
        <div>
          <div style={{ color: colors.white }}>
            Продуктът беше премахнат от количката! 😎
          </div>
          <Link style={{ color: colors.white }} to="/products">
            Виж всички продукти
          </Link>
        </div>
      ),
      { className: 'gold-background' }
    )

  removeItemFromCart = e => {
    this.state.cartItems.forEach(cartItem => {
      if (cartItem.contentful_id + cartItem.selectedSize === e.target.id) {
        let updatedItems = this.state.cartItems.filter(
          e =>
            e.contentful_id + e.selectedSize !==
            cartItem.contentful_id + cartItem.selectedSize
        )
        this.setState({ cartItems: updatedItems }, () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('cart', JSON.stringify(updatedItems))
            let cartItems = JSON.parse(localStorage.getItem('cart')).length || 0
            this.props.updateCartItemsCount(cartItems)
            this.successRemovedItemToast()
          }
        })
      }
    })
  }

  renderEmptyCart = () => {
    return (
      <Container height="0.9rem">
        <EmptyCartLabel>Твоята количка е празна</EmptyCartLabel>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <GhostButtonLink to="/products" style={{ fontSize: '1rem' }}>
            Виж продуктите
          </GhostButtonLink>
        </div>
      </Container>
    )
  }

  renderCartContent = cartItems => {
    return (
      <div>
        <Container backgroundColor={colors.grey} height="0.9rem">
          <CartTable
            readOnly={false}
            cartItems={cartItems}
            removeItemFromCart={this.removeItemFromCart}
          />
        </Container>
        <TotalPriceContainer cartItems={cartItems} />
        <Row justify="end" align="middle" style={{ marginTop: '1rem' }}>
          <FeaturedButtonLink to="/checkout">Продължи</FeaturedButtonLink>
        </Row>
      </div>
    )
  }

  render() {
    const { cartItems } = this.state
    let isCartEmpty = cartItems.length === 0

    return (
      <div>
        <H1 centered>Количка</H1>
        {isCartEmpty
          ? this.renderEmptyCart()
          : this.renderCartContent(cartItems)}
        <Toast />
      </div>
    )
  }
}

export default Cart
