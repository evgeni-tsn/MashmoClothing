import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'

import { StyledLink } from './styled/StyledLink'
import { Logo } from './styled/Logo'
import { Container } from './styled/Container'

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
`

const DesktopMenuItem = styled.li`
  padding-left: 20px;
  list-style: none;
  margin: 0;
`

const activeClassName = 'active'
const NavLink = styled(StyledLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: ${colors.main};
    border-bottom: 2px solid ${colors.light};
  }
`

const Header = () => {
  return (
    <HeaderContent>
      <HeaderContainer>
        <Logo />
        <DesktopMenu>
          <DesktopMenuItem>
            <NavLink to="/products">Products</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/gallery">Gallery</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/influencers">Influencers</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/shipping">Shipping</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/contacts">Contacts</NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink to="/cart">Cart</NavLink>
          </DesktopMenuItem>
        </DesktopMenu>
      </HeaderContainer>
    </HeaderContent>
  )
}

export default Header
