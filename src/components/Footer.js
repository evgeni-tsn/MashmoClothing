import React from 'react'
import styled from 'styled-components'

import {
  StyledLink,
  Container,
  Logo,
  IconLink,
  HeaderIcon,
  VerticalLine,
} from './styled'

import colors from '../utils/colors'

import fbIcon from '../images/icons/facebook.png'
import igIcon from '../images/icons/instagram.png'
import mailIcon from '../images/icons/mail.png'

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
  margin: 0.5rem;
`

const FooterVerticalLine = styled(VerticalLine)`
  @media only screen and (max-width: 991px) {
    display: none;
  }
`

const FooterLinksContainer = styled.div`
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;

  @media only screen and (max-width: 991px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Footer = () => {
  return (
    <FooterContent>
      <FooterContainer>
        <Logo footer />
        <FooterLinksContainer>
          <FooterLinks smaller thin light to="/" exact={true}>
            Начало
          </FooterLinks>
          <FooterVerticalLine />
          {/* <FooterLinks smaller thin light to="/influencers" exact={true}>
            Инфлуенсъри
          </FooterLinks> */}
          {/* <FooterVerticalLine /> */}
          <FooterLinks smaller thin light to="/gallery" exact={true}>
            Галерия
          </FooterLinks>
          <FooterVerticalLine />
          <FooterLinks smaller thin light to="/info" exact={true}>
            Информация
          </FooterLinks>
          <FooterVerticalLine />
          <FooterLinks smaller thin light to="/products" exact={true}>
            Продукти
          </FooterLinks>
        </FooterLinksContainer>
        <div>
          <IconExternalLink
            href="https://www.facebook.com/mashmoclothing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HeaderIcon src={fbIcon} alt={'facebook'} />
          </IconExternalLink>
          <IconExternalLink
            href="https://www.instagram.com/mashmoclothing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HeaderIcon src={igIcon} alt={'instagram'} />
          </IconExternalLink>
          <IconLink to="/contact">
            <HeaderIcon src={mailIcon} alt={'mail'} />
          </IconLink>
        </div>
      </FooterContainer>
    </FooterContent>
  )
}
