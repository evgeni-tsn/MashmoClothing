import React from 'react'
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
    price: '$20',
    quantity: '1',
    total: '$20',
  },
  {
    id: 2,
    name: 'Mashmo Black T-Shirt',
    price: '$30',
    quantity: '2',
    total: '$60',
  },
  {
    id: 3,
    name: 'Mashmo Black Cap',
    price: '$10',
    quantity: '1',
    total: '$10',
  },
]

const TH = styled(Th)`
  text-align: center;
`
const TD = styled(Td)`
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

const Cart = () => (
  <div>
    <H1 underlined>Your Cart</H1>
    <Container backgroundColor={colors.grey}>
      <Table>
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
              <TD>{product.price}</TD>
              <TD>{product.quantity}</TD>
              <TD>{product.total}</TD>
            </TR>
          ))}
        </Tbody>
      </Table>
    </Container>
  </div>
)

export default Cart
