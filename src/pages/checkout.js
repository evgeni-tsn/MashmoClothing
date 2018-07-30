import React from 'react'
import { push } from 'gatsby-link'
import { Row, Col } from 'react-simple-flex-grid'
import { toast } from 'react-toastify'
import Form from 'react-validation/build/form'

import { Toast, CartTable } from '../components'
import {
  H1,
  SubmitButton,
  InputField,
  Container,
  GhostButtonLink,
  TextAreaField,
} from '../components/styled'

import colors from '../utils/colors'
import { required } from '../utils/validations'
import { createOrder, updateEntry } from '../services/contentfulManagement'

const initialState = {
  cartItems: [],
}

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.setState(
        {
          cartItems: JSON.parse(localStorage.getItem('cart')) || [],
        },
        () => {
          if (this.state.cartItems.length === 0) {
            this.props.history.push('/products')
          }
        }
      )
    }
  }

  handleChange = e => {
    //TODO: Create Validations if we reenable button
    this.setState({ [e.target.name]: e.target.value })
  }

  successMadeOrder = () =>
    toast(
      () => (
        <div>
          <div style={{ color: colors.white }}>
            Поръчката беше направена успешно! 😎
          </div>
        </div>
      ),
      { className: 'gold-background' }
    )

  handleSubmit = e => {
    e.preventDefault()
    const updateReadyItems = []
    this.state.cartItems.forEach(item => {
      let updatedFlag = false
      for (const key in updateReadyItems) {
        if (item.contentful_id === updateReadyItems[key].contentful_id) {
          updatedFlag = true
          updateReadyItems[key].selectedSize = [
            ...updateReadyItems[key].selectedSize,
            item.selectedSize,
          ]
          updateReadyItems[key].quantity = [
            ...updateReadyItems[key].quantity,
            item.quantity,
          ]
        }
      }
      if (!updatedFlag) {
        updateReadyItems.push(item)
      }
    })

    createOrder(this.state)
      .then(entry => {
        console.log(entry)
        updateReadyItems.forEach(item => {
          updateEntry(item)
        })
        this.setState(initialState)
        this.successMadeOrder()
        localStorage.setItem('cart', JSON.stringify([]))
        this.props.updateCartItemsCount(0)
      })
      .catch(err => console.log(err))

    //TODO: Validate backend fields
    //TODO: Redirect to Success Page Thanks!
  }

  render() {
    const { cartItems } = this.state
    return (
      <div>
        <H1 centered>Завършване на поръчката</H1>
        <Container backgroundColor={colors.grey} height="0.9rem">
          <CartTable readOnly={true} cartItems={cartItems} />
          <Row justify="end">
            <GhostButtonLink to="/cart" style={{ fontSize: '1rem' }}>
              Обратно към количката
            </GhostButtonLink>
          </Row>
        </Container>
        <br />
        <H1 centered>Данни за доставка</H1>
        <Form
          name="order"
          method="post"
          action="/"
          onSubmit={this.handleSubmit}
        >
          <Row gutter={40}>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputField
                type="text"
                name="firstName"
                placeholder="Име *"
                validations={[required]}
                onChange={this.handleChange}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Фамилия *"
                validations={[required]}
                onChange={this.handleChange}
              />
              <InputField
                type="text"
                name="phone"
                placeholder="Телефон *"
                validations={[required]}
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputField
                type="text"
                name="city"
                placeholder="Град *"
                validations={[required]}
                onChange={this.handleChange}
              />
              <InputField
                type="text"
                name="econt"
                placeholder="Еконт офис *"
                validations={[required]}
                onChange={this.handleChange}
              />
              <TextAreaField
                name="note"
                rows={2}
                placeholder="Бележка"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row justify="center">
            <SubmitButton type="submit">Поръчай</SubmitButton>
          </Row>
        </Form>
        <Toast />
      </div>
    )
  }
}

export default Checkout
