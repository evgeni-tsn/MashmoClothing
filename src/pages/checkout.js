import React from 'react'
import H1 from '../components/styled/H1'

import { Row, Col } from 'react-simple-flex-grid'
import { FeaturedButton } from '../components/styled/FeaturedButton'
import { InputField } from '../components/styled/InputField'
import { TextAreaField } from '../components/styled/TextAreaField'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    //TODO: Redirect from this page to Products if there is nothing in the cart
    this.state = {}
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
    return (
      <div>
        <H1 underlined>Завършване на поръчката</H1>
        {/* TODO: Create Cart table resuable and use is here */}
        <p>Cart Table</p>
        <p>Cart Table</p>
        <p>Cart Table</p>
        <p>Cart Table</p>
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
