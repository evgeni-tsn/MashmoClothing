import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'

import { CartTable, TotalPriceContainer } from '../components'
import { H1 } from '../components/styled'

class Summary extends React.Component {
  state = { cartItems: [] }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.setState(
        {
          cartItems: JSON.parse(localStorage.getItem('cart')) || [],
        },
        () => {
          if (this.state.cartItems.length === 0) {
            this.props.history.push('/cart')
          }
        }
      )
    }
  }

  render() {
    const { cartItems } = this.state
    return (
      <div>
        <Row gutter={40}>
          <Col span={6} offset={3}>
            <H1 centered>Успешно направена поръчка</H1>
            <h2 style={{ textAlign: 'center' }}>
              Детайли за направената поръчка
            </h2>
            <CartTable readOnly={true} cartItems={cartItems} />
            <TotalPriceContainer cartItems={cartItems} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Summary
