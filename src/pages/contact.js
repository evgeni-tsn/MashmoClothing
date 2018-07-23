import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'
import { toast } from 'react-toastify'
import Form from 'react-validation/build/form'

import { Toast } from '../components'
import { SubmitButton, InputField, TextAreaField } from '../components/styled'

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
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  //TODO: catch possible error and display another err toast
  //TODO: redirect to a page with success msg is also an option
  successSubmittedForm = () =>
    toast(() => (
      <div>
        <div style={{ color: colors.black }}>
          Съобщението ви беше изпратено успешно! 😎
        </div>
      </div>
    ))

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      // .then(() => navigateTo(form.getAttribute('action')))
      .then(() => {
        this.successSubmittedForm()
        console.log('Success')
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <ContactsContainer>
        <PageHeading>Пишете ни</PageHeading>
        <Form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <label>
              <InputField
                type="text"
                name="name"
                placeholder="Име *"
                validations={[required]}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              <InputField
                type="email"
                name="email"
                placeholder="Email *"
                validations={[required, email]}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              <TextAreaField
                name="message"
                rows={4}
                placeholder="Съобщение *"
                validations={[required, gt]}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p style={{ marginTop: '2rem' }}>
            <SubmitButton type="submit" style={{ width: '15%' }}>
              Изпрати
            </SubmitButton>
          </p>
        </Form>
        <Toast />
      </ContactsContainer>
    )
  }
}
