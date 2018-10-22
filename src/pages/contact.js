import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'
import { toast } from 'react-toastify'
import Form from 'react-validation/build/form'

import { Toast } from '../components'
import {
  SubmitButton,
  InputField,
  TextAreaField,
  GhostButton,
  GhostButtonLink,
} from '../components/styled'

import colors from '../utils/colors'
import { required, email, gt } from '../utils/validations'

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
    this.state = {
      isSent: false,
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //TODO: catch possible error and display another err toast
  //TODO: redirect to a page with success msg is also an option
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

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
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

  render() {
    const { isSent } = this.state
    return (
      <ContactsContainer>
        {!isSent && <PageHeading>Пишете ни</PageHeading>}
        {!isSent && (
          <Form
            name="contact"
            method="POST"
            // action="/thanks/"
            data-netlify="true"
            netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <label hidden>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
            <label>
              <InputField
                type="text"
                name="name"
                placeholder="Име *"
                validations={[required]}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <InputField
                type="email"
                name="email"
                placeholder="Email *"
                validations={[required, email]}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <TextAreaField
                name="message"
                rows={4}
                placeholder="Съобщение *"
                validations={[required, gt]}
                onChange={this.handleChange}
              />
            </label>
            <SubmitButton
              type="submit"
              style={{ width: '15%', marginTop: '2rem' }}
            >
              Изпрати
            </SubmitButton>
          </Form>
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
