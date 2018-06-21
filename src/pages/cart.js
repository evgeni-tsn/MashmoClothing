import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../utils/responsiveTablesCSS.css'

import H1 from '../components/styled/H1'
import { Container } from '../components/styled/Container'
import colors from '../utils/colors'

const productsInCart = [
  {
    id: 1,
    name: 'Mashmo Palms Cap',
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Mashmo Black T-Shirt',
    price: 30,
    quantity: 2,
  },
  {
    id: 3,
    name: 'Mashmo Black Cap',
    price: 10,
    quantity: 1,
  },
]

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

const Cart = () => (
  <div>
    <H1 underlined>Your Cart</H1>
    <Container backgroundColor={colors.grey} height="0.9rem">
      <TABLE>
        <Thead>
          <Tr>
            <TH>Product</TH>
            <TH>Price</TH>
            <TH>Quantity</TH>
            <TH>Total</TH>
          </Tr>
        </Thead>
        <Tbody>
          {productsInCart.map(product => (
            <TR key={product.id}>
              {/* TODO: This could be a link to the item */}
              <TD>{product.name}</TD>
              <TD>${product.price}</TD>
              <TD>{product.quantity}</TD>
              <TD>${product.price * product.quantity}</TD>
            </TR>
          ))}
        </Tbody>
      </TABLE>
    </Container>
    <TotalContainer>
      <P>
        Total:{' '}
        <Span>
          ${productsInCart.reduce(
            (total, curr) => total + Number(curr.price * curr.quantity),
            0
          )}
        </Span>
      </P>
      <Link to="/">
        <Button>Proceed</Button>
      </Link>
    </TotalContainer>
  </div>
)

export default Cart
