import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import { toast } from 'react-toastify'
import Form from 'react-validation/build/form'

import { Toast, CartTable } from '../components'
import {
  H1,
  SubmitButton,
  InputField,
  GhostButtonLink,
  TextAreaField,
  CartContainer,
} from '../components/styled'

import colors from '../utils/colors'
import { required } from '../utils/validations'
import { calculateTotal } from '../utils/utilFunctions'
import { createOrder, updateEntry } from '../services/contentfulManagement'

const CheckoutGhostButtonLink = styled(GhostButtonLink)`
  font-size: 1rem;
  min-width: unset;

  @media only screen and (max-width: 767px) {
    text-align: center;
    width: 100%;
    margin-bottom: 0.7rem;
  }
`

const InfoText = styled.p`
  text-align: right;
  margin-right: 2rem;
  font-size: 1.1rem;

  @media only screen and (max-width: 767px) {
    text-align: center;
    width: 100%;
  }
`

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
        updateReadyItems.push({
          ...item,
          selectedSize: [item.selectedSize],
          quantity: [item.quantity],
        })
      }
    })

    createOrder(this.state)
      .then(entry => {
        updateReadyItems.forEach(item => {
          updateEntry(item)
        })
        this.setState(initialState)
        this.successMadeOrder()
        // localStorage.setItem('cart', JSON.stringify([]))
        this.props.updateCartItemsCount(0)
        this.props.history.push('/summary')
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
        <CartContainer height="0.9rem">
          <CartTable readOnly={true} cartItems={cartItems} />
          <Row justify="space-between" align="middle">
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <CheckoutGhostButtonLink to="/cart">
                Виж количка
              </CheckoutGhostButtonLink>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div>
                <InfoText>
                  Доставка: <strong>0лв.</strong>
                </InfoText>
                <InfoText>
                  Обща сума: <strong>{calculateTotal(cartItems)}лв.</strong>
                </InfoText>
              </div>
            </Col>
          </Row>
        </CartContainer>
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
