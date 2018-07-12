import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../utils/responsiveTablesCSS.css'

import H1 from '../components/styled/H1'
import { Container } from '../components/styled/Container'
import { FeaturedButtonLink } from '../components/styled/FeaturedButtonLink'
import CartTable from '../components/CartTable'
import colors from '../utils/colors'

const Span = styled.span`
  color: ${colors.main};
  padding-left: 0.2rem;
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

  render() {
    const { cartItems } = this.state
    let isCartEmpty = cartItems.length === 0

    let removeItemFromCart = e => {
      cartItems.forEach(cartItem => {
        if (cartItem.contentful_id === e.target.id) {
          let updatedItems = cartItems.filter(
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
    return (
      <div>
        <H1 underlined>Your Cart</H1>
        {isCartEmpty ? (
          //TODO: Add more cool msg and redirect
          <Container backgroundColor={colors.grey} height="0.9rem">
            <h1>The Cart is Empty</h1>
          </Container>
        ) : (
          <div>
            <Container backgroundColor={colors.grey} height="0.9rem">
              <CartTable
                readOnly={false}
                cartItems={cartItems}
                removeItemFromCart={removeItemFromCart}
              />
            </Container>
            <TotalContainer>
              <P>
                Total:{' '}
                <Span>
                  ${cartItems.reduce(
                    (total, curr) => total + Number(curr.price * curr.quantity),
                    0
                  )}
                </Span>
              </P>
              <FeaturedButtonLink to="/checkout">Продължи</FeaturedButtonLink>
            </TotalContainer>
          </div>
        )}
      </div>
    )
  }
}

export default Cart
