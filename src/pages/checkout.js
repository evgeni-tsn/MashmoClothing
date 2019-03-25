import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Toast, CartTable } from '../components'
import {
  H1,
  SubmitButton,
  InputField,
  FeaturedButton,
  GhostButtonLink,
  TextAreaField,
  CartContainer,
} from '../components/styled'

import colors from '../utils/colors'
import { calculateTotal } from '../utils/utilFunctions'
import { createOrder, updateEntry, checkDiscountCode } from '../services/contentfulManagement'

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
  inProcess: false,
  discountCodeValue: ''
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

  successMadeOrder = () => {
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
  }

  handleSubmit = values => {
    const fullOrderData = { cartItems: this.state.cartItems, ...values }
    this.setState({ inProcess: true })
    const updateReadyItems = []
    fullOrderData.cartItems.forEach(item => {
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

    createOrder(fullOrderData)
      .then(entry => {
        updateReadyItems.forEach(item => {
          updateEntry(item)
        })
        this.props.updateCartItemsCount(0)
        const orderData = { ...fullOrderData }
        this.setState(initialState)
        this.successMadeOrder()
        this.props.history.push('/summary', {
          ...orderData,
          orderId: entry.fields.orderId['en-US'],
        })
      })
      .catch(err => console.log(err))
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
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            city: '',
            econt: '',
            note: '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .min(2, 'Името трябва да съдържа поне 2 символа')
              .required('Задължително поле'),
            lastName: Yup.string()
              .min(2, 'Името трябва да съдържа поне 2 символа')
              .required('Задължително поле'),
            phone: Yup.string().required('Задължително поле'),
            email: Yup.string()
              .email('Невалиден email')
              .max(40, 'Email-a не трябва да съдържа повече от 40 символа')
              .required('Задължително поле'),
            city: Yup.string().required('Задължително поле'),
            econt: Yup.string().required('Задължително поле'),
            note: Yup.string(),
          })}
          onSubmit={values => {
            this.handleSubmit(values)
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              handleReset,
            } = props
            return (
              <form
                name="order"
                method="post"
                action="/"
                onSubmit={handleSubmit}
              >
                <Row gutter={40}>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <InputField
                      type="text"
                      name="firstName"
                      placeholder="Име *"
                      id="name"
                      onChange={this.handleChange}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.firstName && touched.firstName
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.firstName &&
                      touched.firstName && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.firstName}
                        </div>
                      )}

                    <InputField
                      type="text"
                      name="lastName"
                      placeholder="Фамилия *"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.lastName &&
                      touched.lastName && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.lastName}
                        </div>
                      )}

                    <InputField
                      type="email"
                      name="email"
                      placeholder="Email *"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.email &&
                      touched.email && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.email}
                        </div>
                      )}

                    <InputField
                      type="text"
                      name="phone"
                      placeholder="Телефон *"
                      id="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.phone && touched.phone
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.phone &&
                      touched.phone && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.phone}
                        </div>
                      )}
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <InputField
                      type="text"
                      name="city"
                      placeholder="Град *"
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.city && touched.city
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.city &&
                      touched.city && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.city}
                        </div>
                      )}

                    <InputField
                      type="text"
                      name="econt"
                      placeholder="Еконт офис *"
                      id="econt"
                      value={values.econt}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.econt && touched.econt
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.econt &&
                      touched.econt && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.econt}
                        </div>
                      )}
                    <TextAreaField
                      type="text"
                      name="note"
                      rows={2}
                      placeholder="Бележка"
                      id="note"
                      value={values.note}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.note && touched.note
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.note &&
                      touched.note && (
                        <div style={{ color: colors.red, textAlign: 'center' }}>
                          {errors.note}
                        </div>
                      )}
                  </Col>
                </Row>
                <Row justify="center">
                  {this.state.inProcess ? (
                    <FeaturedButton
                      style={{ marginTop: '2rem' }}
                      grayedOut={true}
                    >
                      Поръчката се изпълнява
                    </FeaturedButton>
                  ) : (
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      Поръчай
                    </SubmitButton>
                  )}
                </Row>
              </form>
              
            )
          }}
        </Formik>
        <label>Код за отстъпка</label>
        <input 
          value={this.state.discountCodeValue} 
          onChange={(e) => this.setState({discountCodeValue: e.target.value})} 
          type="text"
        />
        <button onClick={() => checkDiscountCode(this.state.discountCodeValue)}>
          Приложи
        </button>
        <Toast />
      </div>
    )
  }
}

export default Checkout
