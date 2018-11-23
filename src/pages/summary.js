import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'

import { CartTable, TotalPriceContainer } from '../components'

class Summary extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/cart')
      return null
    } else {
      const orderData = this.props.location.state
      const { cartItems, ...userData } = orderData
      return (
        <div>
          <Row gutter={40}>
            <Col span={10} offset={1}>
              <h2 style={{ textAlign: 'center' }}>Успешно направена поръчка</h2>
              <h3 style={{ marginTop: '.4rem', textAlign: 'center' }}>
                #{userData.orderId}
              </h3>
              <h4 style={{ marginTop: '.8rem', textAlign: 'center' }}>
                Данни за доставка
              </h4>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
              >
                <p>
                  <strong>Име:</strong> {userData.firstName} {userData.lastName}
                </p>
                <p>
                  <strong>Телефон:</strong> {userData.phone}
                </p>
                <p>
                  <strong>Град:</strong> {userData.city}
                </p>
                <p>
                  <strong>Еконт:</strong> {userData.econt}
                </p>
              </div>
              <CartTable
                withHeader={true}
                readOnly={true}
                cartItems={cartItems}
              />
              <TotalPriceContainer centered cartItems={cartItems} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem',
                }}
              >
                <h3 style={{ padding: '0.5rem' }}>
                  Благодарим Ви за поръчката
                </h3>
                <p style={{ textAlign: 'center' }}>
                  За повече информация може да посетите страницата ни с
                  Информация или може да се свържете с нас в Instagram или
                  Facebook
                </p>
              </div>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

export default Summary
