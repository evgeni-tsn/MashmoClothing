import React from 'react'
import styled from 'styled-components'

import { GhostButtonLink } from '../components/styled'

import notFoundImage from '../images/404.png'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const NotFoundPage = () => (
  <NotFoundContainer>
    <h1>NOT FOUND</h1>
    <img src={notFoundImage} style={{ marginTop: '2.5rem' }} />
    <GhostButtonLink
      to="/products"
      style={{ fontSize: '1.4rem', marginTop: '2.5rem' }}
    >
      Обратно към продуктите
    </GhostButtonLink>
  </NotFoundContainer>
)

export default NotFoundPage
