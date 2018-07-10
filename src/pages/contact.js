import React from 'react'
import styled from 'styled-components'
import { navigateTo } from 'gatsby-link'

import { FeaturedButton } from '../components/styled/FeaturedButton'
import { InputField } from '../components/styled/InputField'
import { TextAreaField } from '../components/styled/TextAreaField'

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
      .then(() => console.log('Success'))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <ContactsContainer>
        <PageHeading>Пишете ни</PageHeading>
        <form
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
                placeholder="Име"
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              <TextAreaField
                name="message"
                rows={4}
                placeholder="Съобщение"
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <FeaturedButton type="submit">Изпрати</FeaturedButton>
          </p>
        </form>
      </ContactsContainer>
    )
  }
}
