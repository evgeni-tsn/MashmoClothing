import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

import { FeaturedButton } from './styled/FeaturedButton'

import '../utils/responsiveTablesCSS.css'
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

const CartTable = ({ cartItems, removeItemFromCart, readOnly }) => {
  return (
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
          <TR key={product.contentful_id}>
            <TD>
              <Link to={product.slug}>{product.name}</Link>
            </TD>
            <TD>${product.price}</TD>
            <TD>{product.quantity}</TD>
            <TD>${product.price * product.quantity}</TD>

            <TD>
              {/* TODO: Display modal msg are you sure? */}
              {!readOnly && (
                <FeaturedButton
                  id={product.contentful_id}
                  onClick={e => removeItemFromCart(e)}
                >
                  Remove
                </FeaturedButton>
              )}
            </TD>
          </TR>
        ))}
      </Tbody>
    </TABLE>
  )
}

export default CartTable
