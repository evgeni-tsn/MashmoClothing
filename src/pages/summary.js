import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'

import { CartTable, TotalPriceContainer } from '../components'
import { H1 } from '../components/styled'

class Summary extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/cart')
    } else {
      const orderData = this.props.location.state
      const { cartItems, ...userData } = orderData
      return (
        <div>
          <Row gutter={40}>
            <Col span={6} offset={3}>
              <H1 centered>Успешно направена поръчка!</H1>
              <h3 style={{ textAlign: 'center' }}>
                Номер на поръчката: {userData.orderId}
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
              >
                <p>{userData.firstName}</p>
                <p>{userData.lastName}</p>
                <p>{userData.econt}</p>
              </div>
              <CartTable
                withHeader={false}
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
                  Благодарим ви за поръчката
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
