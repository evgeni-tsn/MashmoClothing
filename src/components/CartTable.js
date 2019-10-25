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

const GhostButtonReponsive = styled(GhostButton)`
  @media only screen and (max-width: 767px) {
    position: absolute;
    right: -1.5rem;
    top: -18rem;
  }
`

const TR = styled(Tr)`
  &:nth-child(odd) {
    background: ${colors.white};
  }

  &:nth-child(even) {
    background: ${colors.grey};
  }

  @media only screen and (max-width: 767px) {
    border: none !important;
    border-bottom: 1px solid ${colors.darkGrey} !important;
    border-top: 1px solid ${colors.darkGrey} !important;
    &:nth-child(odd) {
      background: ${colors.white};
    }

    &:nth-child(even) {
      background: ${colors.white};
    }
  }
`

export const CartTable = ({
  cartItems,
  removeItemFromCart,
  readOnly,
  withHeader = true,
}) => {
  return (
    <TABLE>
      {withHeader && (
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
      )}

      <Tbody>
        {cartItems.map(product => {
          const totalPrice = product.price * product.quantity
          return (
            <TR
              style={{ position: 'relative' }}
              key={product.contentful_id + product.selectedSize}
            >
              <TD>
                <Link to={product.slug}>{product.name}</Link>
              </TD>
              <TD>
                {product.selectedSize === 'OneSize'
                  ? 'One Size'
                  : product.selectedSize}
              </TD>
              <TD>{product.price.toFixed(2)}лв.</TD>
              <TD>{product.quantity}</TD>
              <TD>{totalPrice.toFixed(2)}лв.</TD>

              <TD
                style={{ position: 'absolute', right: '0.5rem', top: '0rem' }}
              >
                {/* TODO: Display modal msg are you sure? */}
                {!readOnly && (
                  <GhostButtonReponsive
                    id={product.contentful_id + product.selectedSize}
                    onClick={e => removeItemFromCart(e)}
                  >
                    ✕
                  </GhostButtonReponsive>
                )}
              </TD>
            </TR>
          )
        })}
      </Tbody>
    </TABLE>
  )
}
