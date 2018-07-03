import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import colors from '../../utils/colors'

export const StyledLink = styled(({ smaller, thin, light, ...rest }) => (
  <Link {...rest} />
))`
  text-decoration: none;
  font-size: 1rem;
  color: ${({ light }) => (light ? colors.white : colors.black)};
  font-weight: ${({ thin }) => (thin ? 'lighter' : 'bold')};
`
