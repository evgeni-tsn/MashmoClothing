import React from 'react'
import styled from 'styled-components'

import { GhostButtonLink, Container } from '../components/styled'

import notFoundImage from '../images/404.png'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const NotFoundPage = () => (
  <Container>
    <NotFoundContainer>
      <img src={notFoundImage} style={{ maxWidth: '75%' }} />
      <h1 style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        Съжаляваме, но тази страница не бе открита
      </h1>
      <GhostButtonLink
        to="/products"
        style={{ fontSize: '1.4rem', marginTop: '2.5rem' }}
      >
        Обратно към продуктите
      </GhostButtonLink>
    </NotFoundContainer>
  </Container>
)

export default NotFoundPage
