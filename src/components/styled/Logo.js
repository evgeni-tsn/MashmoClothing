import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import colors from '../../utils/colors'
import logo from '../../images/header-logo.png'

const StyledLogo = styled.img`
  width: 75%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '75%')};
`

export const Logo = ({ maxWidth }) => (
  <Link to="/">
    <StyledLogo src={logo} maxWidth={maxWidth} />
  </Link>
)

Logo.propTypes = {
  maxWidth: PropTypes.string,
}
