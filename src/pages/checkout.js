import React from 'react'
import H1 from '../components/styled/H1'

import { Row, Col } from 'react-simple-flex-grid'
import { FeaturedButton } from '../components/styled/FeaturedButton'
import { InputField } from '../components/styled/InputField'
import { Container } from '../components/styled/Container'
import { TextAreaField } from '../components/styled/TextAreaField'
import CartTable from '../components/CartTable'
import colors from '../utils/colors'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    //TODO: Redirect from this page to Products if there is nothing in the cart
    this.state = {
      cartItems: [],
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      })
    }
  }

  handleChange = e => {
    //TODO: Create Validations
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    //TODO: Create Validations
    e.preventDefault()
    console.log('Submit Order')
  }

  render() {
    const { cartItems } = this.state
    let isCartEmpty = cartItems.length === 0

    return (
      <div>
        <H1 underlined>Завършване на поръчката</H1>
        <Container backgroundColor={colors.grey} height="0.9rem">
          <CartTable readOnly={true} cartItems={cartItems} />
          {/* TODO: Replace this with link to /cart */}
          <p style={{ textAlign: 'right' }}>Link back to the cart for edit</p>
        </Container>
        <H1 underlined>Данни за доставка</H1>
        <form
          name="order"
          method="post"
          action="/" //TODO: decide what to do here maybe thanks for the order ?
          onSubmit={this.handleSubmit}
        >
          <Row gutter={40}>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputField
                type="text"
                name="name"
                placeholder="Име и Фамилия"
                onChange={this.handleChange}
              />
              <InputField
                type="text"
                name="name"
                placeholder="Телефон"
                onChange={this.handleChange}
              />
              <InputField
                type="text"
                name="name"
                placeholder="Адрес"
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputField
                type="text"
                name="name"
                placeholder="Еконт офис"
                onChange={this.handleChange}
              />
              <TextAreaField
                name="message"
                rows={4}
                placeholder="Бележка"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row justify="center">
            <FeaturedButton type="submit">Поръчай</FeaturedButton>
          </Row>
        </form>
      </div>
    )
  }
}

export default Checkout
