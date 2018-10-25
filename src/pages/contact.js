import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { Toast } from '../components'
import {
  SubmitButton,
  InputField,
  TextAreaField,
  GhostButton,
  GhostButtonLink,
} from '../components/styled'
import colors from '../utils/colors'

const ContactsContainer = styled.div`
  text-align: center;
`

const PageHeading = styled.h1`
  margin-bottom: 4rem;
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isSent: false }
  }

  handleSubmit = (values, errors) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...values,
      }),
    })
      .then(() => {
        this.successSubmittedForm()
        this.setState({ isSent: true })
      })
      .catch(error => {
        this.errorSubmittedForm()
        setTimeout(() => {
          document.location.reload()
        }, 1500)
      })
  }

  successSubmittedForm = () =>
    toast(
      () => (
        <div>
          <div style={{ color: colors.white }}>
            Съобщението ви беше изпратено успешно! 😎
          </div>
        </div>
      ),
      { className: 'gold-background' }
    )

  errorSubmittedForm = () =>
    toast(
      () => (
        <div>
          <div style={{ color: colors.white }}>
            Възникна грешка при изпращането на съобщението, моля опитайте
            отново! 😟
          </div>
        </div>
      ),
      { className: 'error-background' }
    )

  render() {
    const { isSent } = this.state
    return (
      <ContactsContainer>
        {!isSent && <PageHeading>Пишете ни</PageHeading>}
        {!isSent && (
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Невалиден e-mail адрес')
                .required('Задължително поле'),
              name: Yup.string()
                .min(2, 'Името трябва да съдържа поне 2 символа')
                .required('Задължително поле'),
              message: Yup.string()
                .min(10, 'Съобщението трябва да съдържа поне 10 символа')
                .required('Задължително поле'),
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
                  name="contact"
                  method="post"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="contact" value="contactTest" />
                  <p hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={handleChange} />
                    </label>
                  </p>
                  <InputField
                    id="name"
                    placeholder="Име *"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.name &&
                    touched.name && (
                      <div style={{ color: colors.red }}>{errors.name}</div>
                    )}

                  <InputField
                    id="email"
                    placeholder="Email *"
                    type="text"
                    name="email"
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
                      <div style={{ color: colors.red }}>{errors.email}</div>
                    )}

                  <TextAreaField
                    id="message"
                    placeholder="Съобщение *"
                    rows={4}
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.message && touched.message
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  {errors.message &&
                    touched.message && (
                      <div style={{ color: colors.red }}>{errors.message}</div>
                    )}
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    Изпрати
                  </SubmitButton>
                </form>
              )
            }}
          </Formik>
        )}
        {isSent && (
          <div style={{ marginTop: '3rem' }}>
            <p>Благодарим за информацията.</p>
            <p>Ще прегледаме вашето съобщение в най-кратък срок.</p>
            <br />
            <GhostButtonLink to="/" style={{ fontSize: '1rem' }}>
              Към Начало
            </GhostButtonLink>
            <br />
            <br />
            <GhostButton
              style={{ fontSize: '1rem' }}
              onClick={() => document.location.reload()}
            >
              Попълнете формата отново
            </GhostButton>
          </div>
        )}
        <Toast />
      </ContactsContainer>
    )
  }
}
