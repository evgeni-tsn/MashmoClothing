import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../utils/responsiveTablesCSS.css'

import H1 from '../components/styled/H1'
import { Container } from '../components/styled/Container'
import colors from '../utils/colors'

const TABLE = styled(Table)`
  margin-bottom: 1.45rem;
`

const TH = styled(Th)`
  border-bottom: 2px solid ${colors.darkGrey};
  padding-bottom: 1rem;
  text-align: center;
  font-weight: bold;
`

const TD = styled(Td)`
  border: none;
  text-align: center;
`

const TR = styled(Tr)`
  &:nth-child(odd) {
    background: ${colors.white};
  }

  &:nth-child(even) {
    background: ${colors.grey};
  }
`

const Button = styled.button`
  background-color: ${colors.main};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: ${colors.white};
  border: none;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 1px 8px 0px ${colors.dark};
  }
`

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
        cartItem: JSON.parse(localStorage.getItem('cart')) || [],
      })
    }
  }

  render() {
    const { cartItems } = this.state
    let isCartEmpty = cartItems.length === 0

    let removeItemFromCart = e => {
      cartItems.forEach(cartItem => {
        if (cartItem.id === e.target.id) {
          let updatedItems = cartItems.filter(e => e.id !== cartItem.id)
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
              <TABLE>
                <Thead>
                  <Tr>
                    <TH>Product</TH>
                    <TH>Price</TH>
                    <TH>Quantity</TH>
                    <TH>Total</TH>
                    <TH />
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map(product => (
                    <TR key={product.id}>
                      <TD>
                        <Link to={product.slug}>{product.name}</Link>
                      </TD>
                      <TD>${product.price}</TD>
                      <TD>{product.quantity}</TD>
                      <TD>${product.price * product.quantity}</TD>
                      <TD>
                        {/* TODO: Display modal msg are you sure? */}
                        <Button
                          id={product.id}
                          onClick={e => removeItemFromCart(e)}
                        >
                          Remove
                        </Button>
                      </TD>
                    </TR>
                  ))}
                </Tbody>
              </TABLE>
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
              <Link to="/createOrder">
                <Button>Proceed</Button>
              </Link>
            </TotalContainer>
          </div>
        )}
      </div>
    )
  }
}

export default Cart
