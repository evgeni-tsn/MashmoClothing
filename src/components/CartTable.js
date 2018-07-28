import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

import { GhostButton } from './styled'

import colors from '../utils/colors'

import '../utils/responsiveTablesCSS.css'

const TABLE = styled(Table)`
  margin-bottom: 1.15rem;
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

export const CartTable = ({ cartItems, removeItemFromCart, readOnly }) => {
  return (
    <TABLE>
      <Thead>
        <Tr>
          <TH>Продукт</TH>
          <TH>Размер</TH>
          <TH>Цена</TH>
          <TH>Количество</TH>
          <TH>Общо</TH>
          <TH />
        </Tr>
      </Thead>
      <Tbody>
        {cartItems.map(product => (
          <TR key={product.contentful_id + product.selectedSize}>
            <TD>
              <Link to={product.slug}>{product.name}</Link>
            </TD>
            <TD>
              {product.selectedSize === 'OneSize'
                ? 'One Size'
                : product.selectedSize}
            </TD>
            <TD>{product.price}лв.</TD>
            <TD>{product.quantity}</TD>
            <TD>{product.price * product.quantity}лв.</TD>

            <TD>
              {/* TODO: Display modal msg are you sure? */}
              {!readOnly && (
                <GhostButton
                  id={product.contentful_id + product.selectedSize}
                  onClick={e => removeItemFromCart(e)}
                >
                  ✕
                </GhostButton>
              )}
            </TD>
          </TR>
        ))}
      </Tbody>
    </TABLE>
  )
}
