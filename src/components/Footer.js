import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import colors from '../utils/colors'

import { StyledLink } from './styled/StyledLink'
import { Container } from './styled/Container'
import { Logo } from './styled/Logo'
import { IconLink } from './styled/IconLink'
import { HeaderIcon } from './styled/HeaderIcon'
import { VerticalLine } from './styled/VericalLine'

import fbIcon from '../images/icons/facebook.png'
import igIcon from '../images/icons/instagram.png'
import mailIcon from '../images/icons/mail.png'
import cartIcon from '../images/icons/cart.png'

const FooterContent = styled.div`
  width: 100%;
  background-color: ${colors.black};
`

const FooterContainer = Container.extend`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  align-items: center;
  background-color: ${colors.black};
`

const IconExternalLink = styled.a`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const FooterLinks = styled(StyledLink)`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const FooterLinksContainer = styled.div`
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;
`

const Footer = () => {
  return (
    <FooterContent>
      <FooterContainer>
        <Logo />
        <FooterLinksContainer>
          <FooterLinks smaller thin light to="/" exact={true}>
            Начало
          </FooterLinks>
          <VerticalLine />
          <FooterLinks smaller thin light to="/influencers" exact={true}>
            Инфлуенсъри
          </FooterLinks>
          <VerticalLine />
          <FooterLinks smaller thin light to="/gallery" exact={true}>
            Галерия
          </FooterLinks>
          <VerticalLine />
          <FooterLinks smaller thin light to="/info" exact={true}>
            Полезно
          </FooterLinks>
          <VerticalLine />
          <FooterLinks smaller thin light to="/products" exact={true}>
            Продукти
          </FooterLinks>
        </FooterLinksContainer>
        <div>
          <IconExternalLink
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HeaderIcon src={fbIcon} alt={'facebook'} />
          </IconExternalLink>
          <IconExternalLink
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HeaderIcon src={igIcon} alt={'instagram'} />
          </IconExternalLink>
          <IconLink to="/contacts">
            <HeaderIcon src={mailIcon} alt={'mail'} />
          </IconLink>
        </div>
      </FooterContainer>
    </FooterContent>
  )
}

export default Footer
