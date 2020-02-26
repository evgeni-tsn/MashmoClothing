import React from 'react'
import styled from 'styled-components'

import { GhostButtonLink, Container } from '../components/styled'

import mashmoHead from '../images/mashmo-head.png'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Soon = () => (
  <Container>
    <NotFoundContainer>
      <img src={mashmoHead} style={{ maxWidth: '35%' }} />
      <h2 style={{ marginTop: '4.5rem', textAlign: 'center' }}>
        Скоро се връщаме.
      </h2>
      <h2 style={{ marginTop: '1rem', textAlign: 'center' }}>
        По-свежи от всякога.
      </h2>
    </NotFoundContainer>
  </Container>
)

export default Soon
