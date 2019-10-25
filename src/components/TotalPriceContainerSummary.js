import React from 'react'
import styled from 'styled-components'

import { Row, Col } from 'react-simple-flex-grid'

import colors from '../utils/colors'
import { calculateTotal } from '../utils/utilFunctions'

const Span = styled.span`
  color: ${colors.main};
`
const TotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  @media only screen and (max-width: 767px) {
    margin-top: 1rem;
  }
`

const TdLabel = styled.td`
  padding-left: 1rem !important;
`
const TdValue = styled.td`
  padding-right: 1rem !important;
  text-align: right;
`

const TotalContainerResponsive = styled(TotalContainer)`
  justify-content: ${({ centered }) => (centered ? 'center' : 'flex-end')};

  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
`

export const TotalPriceContainerSummary = ({
  finalPrice,
  centered,
  cartItems,
  discountCode,
  discountRate,
}) => (
  <TotalContainerResponsive centered={centered}>
    <Row align="middle">
      <Col>
        <table>
          <tbody>
            <tr>
              <TdLabel>Междинна сума:</TdLabel>
              <TdValue>{calculateTotal(cartItems)}лв.</TdValue>
            </tr>
            <tr>
              <TdLabel>Доставка:</TdLabel>
              <TdValue>0лв.</TdValue>
            </tr>
            {discountCode && (
              <tr>
                <TdLabel>Отстъпка:</TdLabel>
                <TdValue>
                  <Span>
                    {' '}
                    {discountRate}% с код {discountCode}
                  </Span>
                </TdValue>
              </tr>
            )}
            <tr>
              <TdLabel>Крайна сума:</TdLabel>
              <TdValue>
                <Span>{finalPrice.toFixed(2)}лв.</Span>
              </TdValue>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </TotalContainerResponsive>
)
