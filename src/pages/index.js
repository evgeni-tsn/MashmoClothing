import React from 'react'
import styled from 'styled-components'

import { GhostButtonLink, Container } from '../components/styled'

import mashmoHead from '../images/mashmo-head.png'
import igIcon from '../images/icons/instagram-big.png'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Soon = () => (
  <Container>
    <NotFoundContainer>
      <img src={mashmoHead} style={{ maxWidth: '320px' }} />
      <h2
        style={{
          marginTop: '2.5rem',
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 'normal',
        }}
      >
        Скоро се връщаме.
      </h2>
      <h2
        style={{
          marginTop: '0.5rem',
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 'normal',
        }}
      >
        По-свежи от всякога.
      </h2>
      <h2
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          fontSize: '2.4rem',
          fontWeight: 'normal',
        }}
      >
        Ще те държим в течение на:
      </h2>
      <a
        style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        href={'https://jo.my/4o4-to-ig'}
        target={'_blank'}
      >
        <img
          style={{ marginRight: '25px', width: '60px', height: '60px' }}
          src={igIcon}
          alt="Instagram icon"
        />
        <h2
          style={{
            fontFamily: 'Kaushan Script',
            fontSize: '2.8rem',
            fontWeight: 'normal',
          }}
        >
          @mashmoculture
        </h2>
      </a>
    </NotFoundContainer>
  </Container>
)

export default Soon
