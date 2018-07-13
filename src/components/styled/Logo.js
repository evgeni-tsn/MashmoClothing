import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'

import logo from '../../images/header-logo.png'

const StyledLogo = styled.img`
  width: 75%;
  margin-top: 0.5rem;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '75%')};
`

const StyledLink = styled(Link)`
  text-align: center;
`

export const Logo = ({ maxWidth }) => (
  <StyledLink className="logo" to="/">
    <StyledLogo alt={'Mashmo Clothing logo'} src={logo} maxWidth={maxWidth} />
  </StyledLink>
)

Logo.propTypes = {
  maxWidth: PropTypes.string,
}
