import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../utils/responsiveTablesCSS.css'

import H1 from '../components/styled/H1'
import { Container } from '../components/styled/Container'
import { FeaturedButtonLink } from '../components/styled/FeaturedButtonLink'
import CartTable from '../components/CartTable'
import colors from '../utils/colors'

const Span = styled.span`
  color: ${colors.main};
`

const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
`

const P = styled.p`
  margin-right: 1rem;
  font-size: 1.2rem;
`

const TdLabel = styled.td`
  padding-left: 1rem !important;
`
const TdValue = styled.td`
  padding-right: 1rem !important;
  text-align: right;
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

  removeItemFromCart = e => {
    this.state.cartItems.forEach(cartItem => {
      if (cartItem.contentful_id === e.target.id) {
        let updatedItems = this.state.cartItems.filter(
          e => e.contentful_id !== cartItem.contentful_id
        )
        this.setState({ cartItems: updatedItems }, () => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('cart', JSON.stringify(updatedItems))
          }
        })
      }
    })
  }

  renderEmptyCart = () => {
    //TODO: Add more cool msg and redirect
    return (
      <Container backgroundColor={colors.grey} height="0.9rem">
        <h1>The Cart is Empty</h1>
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
        <TotalContainer>
          <Row justify="end" align="middle">
            <Col>
              <table>
                <tr>
                  <TdLabel>Междинна сума:</TdLabel>
                  <TdValue>{this.calculateTotal(cartItems)}лв.</TdValue>
                </tr>
                <tr style={{ backgroundColor: colors.grey }}>
                  <TdLabel>Доставка:</TdLabel>
                  <TdValue>0лв.</TdValue>
                </tr>
                <tr>
                  <TdLabel>Общо:</TdLabel>
                  <TdValue>
                    <Span>{this.calculateTotal(cartItems)}лв.</Span>
                  </TdValue>
                </tr>
              </table>
            </Col>
          </Row>
        </TotalContainer>
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
        <H1>Количка</H1>
        {isCartEmpty
          ? this.renderEmptyCart()
          : this.renderCartContent(cartItems)}
      </div>
    )
  }
}

export default Cart
