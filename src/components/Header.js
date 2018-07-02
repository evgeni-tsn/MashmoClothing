import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import colors from '../utils/colors'

import { StyledLink } from './styled/StyledLink'
import { Logo } from './styled/Logo'
import { Container } from './styled/Container'
import { VerticalLine } from './styled/VericalLine'
import { IconLink } from './styled/IconLink'
import { HeaderIcon } from './styled/HeaderIcon'
import { FeaturedButtonLink } from './styled/FeaturedButtonLink'

import fbIcon from '../images/icons/facebook.png'
import igIcon from '../images/icons/instagram.png'
import mailIcon from '../images/icons/mail.png'
import cartIcon from '../images/icons/cart.png'

const HeaderContent = styled.div`
  background-color: ${colors.white};
  margin-bottom: 0.5rem;
`

const HeaderContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
`

const DesktopMenu = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`

const DesktopMenuItem = styled.li`
  padding-left: 30px;
  list-style: none;
  margin: 0;
`

const activeClassName = 'active'
const NavLink = styled(StyledLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: ${colors.main};
    padding-bottom: 0.2rem;
    border-bottom: 0.11rem solid ${colors.light};
  }
`

const IconExternalLink = styled.a`
  margin-left: 1rem;
`

const Header = () => {
  return (
    <HeaderContent>
      <HeaderContainer>
        <Logo />
        <DesktopMenu>
          <DesktopMenuItem>
            <NavLink to="/" exact={true}>
              Начало
            </NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/influencers">Инфлуенсъри</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/gallery">Галерия</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/info">Полезно</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <FeaturedButtonLink to="/products">Продукти</FeaturedButtonLink>
          </DesktopMenuItem>
          <VerticalLine />

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
          <VerticalLine />

          <IconLink to="/cart">
            <HeaderIcon src={cartIcon} alt={'cart'} />
          </IconLink>
        </DesktopMenu>
      </HeaderContainer>
    </HeaderContent>
  )
}

export default Header
