import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'

import { StyledLink } from './styled/StyledLink'
import { Container } from './styled/Container'

const HeaderContent = styled.div`
  background-color: ${colors.black};
  margin-bottom: 1.45rem;
`

const HeaderContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  height: 80px;
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
    color: ${colors.fullWhite};
  }
`

const Header = ({ siteTitle }) => {
  return (
    <HeaderContent>
      <HeaderContainer>
        <StyledLink light to="/">
          {siteTitle}
        </StyledLink>
        <DesktopMenu>
          <DesktopMenuItem>
            <NavLink light to="/products">
              Products
            </NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink light to="/gallery">
              Gallery
            </NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink light to="/influencers">
              Influencers
            </NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink light to="/shipping">
              Shipping
            </NavLink>
          </DesktopMenuItem>
          <DesktopMenuItem>
            <NavLink light to="/contacts">
              Contacts
            </NavLink>
          </DesktopMenuItem>
        </DesktopMenu>
      </HeaderContainer>
    </HeaderContent>
  )
}

export default Header
