import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Measure from 'react-measure'

import logo from '../../images/header-logo.png'
import headLogo from '../../images/mashmo-headlogo.png'

const StyledLogo = styled.img`
  width: 75%;
  margin-top: 0.5rem;
  max-width: ${({ maxWidth, logoSize }) =>
    maxWidth ? maxWidth : logoSize === 'small' ? '30%' : '75%'};
`

const StyledLink = styled(({ logoSize, ...rest }) => <Link {...rest} />)`
  text-align: ${({ logoSize }) => (logoSize === 'small' ? 'left' : 'center')};
  padding-left: ${({ logoSize }) => (logoSize === 'small' ? '1rem' : '0')};
`

export class Logo extends React.Component {
  state = {
    width: 0,
    logoSize:
      typeof window !== 'undefined' && window.innerWidth > 480
        ? 'full'
        : 'small',
  }

  render() {
    const { maxWidth, footer } = this.props
    let showLogo =
      typeof window !== 'undefined' && window.innerWidth > 480 ? logo : headLogo
    if (footer) {
      return (
        <StyledLink className="logo" to="/">
          <StyledLogo
            alt={'Mashmo Clothing logo'}
            src={logo}
            maxWidth={maxWidth}
          />
        </StyledLink>
      )
    }
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({
            logoSize: window.innerWidth > 480 ? 'full' : 'small',
          })
        }}
      >
        {({ measureRef }) => {
          const { logoSize } = this.state
          if (logoSize === 'small') {
            showLogo = headLogo
          } else if (logoSize === 'full') {
            showLogo = logo
          }
          return (
            <div ref={measureRef}>
              <StyledLink logoSize={logoSize} className="logo" to="/">
                <StyledLogo
                  alt={'Mashmo Clothing logo'}
                  src={showLogo}
                  logoSize={logoSize}
                  maxWidth={maxWidth}
                />
              </StyledLink>
            </div>
          )
        }}
      </Measure>
    )
  }
}

Logo.propTypes = {
  maxWidth: PropTypes.string,
}
