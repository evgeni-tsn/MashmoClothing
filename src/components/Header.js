import React from 'react'
import styled from 'styled-components'
import NotificationBadge, { Effect } from 'react-notification-badge'
import HamburgerMenu from 'react-hamburger-menu'

import {
  StyledLink,
  Logo,
  Container,
  VerticalLine,
  IconLink,
  HeaderIcon,
  FeaturedButtonLink,
} from './styled'

import colors from '../utils/colors'

import fbIcon from '../images/icons/facebook.png'
import igIcon from '../images/icons/instagram.png'
import mailIcon from '../images/icons/mail.png'
import cartIcon from '../images/icons/cart.png'

const HeaderContent = styled.div`
  background-color: ${colors.white};
`

const HeaderContainer = Container.extend`
  display: flex;
  justify-content: space-between;
  height: 4rem;
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

const MobileMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 901px) {
    display: none;
  }
`

const MobileVerticalLine = styled(VerticalLine)`
  border-color: ${colors.black};
  margin-left: 1rem;
  margin-right: 0.5rem;
`

const DesktopMenuItem = styled.li`
  padding-left: 30px;
  padding: 0.4rem 0.6rem;
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
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

const MailIconLink = styled(IconLink)`
  padding-top: 0.1rem;
  margin-left: 0.4rem;
`

const DropdownMenu = styled.div`
  display: ${({ firstOpen }) => (firstOpen ? 'none' : 'block')};
  position: absolute;
  top: 3.9rem;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: ${colors.white};
`

const Ul = styled.ul`
  text-align: center;
  list-style-type: none;
`

const Hr = styled.hr`
  margin: 0 auto;
  width: 65%;
  height: 0;
  border: 0;
  border-top: 1px solid ${colors.main};
`

const MobileNavLink = styled(StyledLink).attrs({ activeClassName })`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: block;
  &.${activeClassName} {
    color: ${colors.main};
    padding-bottom: 0.2rem;
  }
`

export class Header extends React.Component {
  state = {
    isOpen: false,
    firstOpen: true,
  }
  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      firstOpen: false,
    })
  }
  render() {
    return (
      <HeaderContent>
        <HeaderContainer>
          <Logo />
          <MobileMenu>
            <HamburgerMenu
              isOpen={this.state.isOpen}
              menuClicked={this.handleClick.bind(this)}
              width={22}
              height={18}
              strokeWidth={2}
              rotate={0}
              color="black"
              borderRadius={0}
              animationDuration={0.5}
            />
            <MobileVerticalLine />
            <MailIconLink to="/cart">
              <div>
                <NotificationBadge
                  style={{
                    backgroundColor: colors.main,
                    top: '-0.31rem',
                  }}
                  count={this.props.cartItemsCount}
                  effect={Effect.SCALE}
                />
                <HeaderIcon
                  src={cartIcon}
                  alt={'cart'}
                  style={{ width: '1.5rem', marginTop: 0 }}
                />
              </div>
            </MailIconLink>
          </MobileMenu>

          <DropdownMenu
            firstOpen={this.state.firstOpen}
            isOpen={this.state.isOpen}
            className={
              this.state.firstOpen
                ? ''
                : this.state.isOpen
                  ? 'scale-in-ver-top'
                  : 'scale-out-ver-top'
            }
          >
            <Ul>
              <MobileNavLink
                to="/"
                exact={true}
                onClick={() => this.setState({ isOpen: false })}
              >
                Начало
              </MobileNavLink>
              <Hr />
              <MobileNavLink
                to="/gallery"
                onClick={() => this.setState({ isOpen: false })}
              >
                Галерия
              </MobileNavLink>
              <Hr />
              <MobileNavLink
                to="/info"
                onClick={() => this.setState({ isOpen: false })}
              >
                Информация
              </MobileNavLink>
              <Hr />
              <MobileNavLink
                to="/products"
                onClick={() => this.setState({ isOpen: false })}
              >
                Продукти
              </MobileNavLink>
              <Hr />
              <div
                style={{
                  display: 'block',
                  marginTop: '1.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <IconExternalLink
                  href="https://www.facebook.com/mashmoclothing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => this.setState({ isOpen: false })}
                >
                  <HeaderIcon
                    src={fbIcon}
                    alt={'facebook'}
                    style={{ width: '0.6rem' }}
                  />
                </IconExternalLink>
                <IconExternalLink
                  href="https://www.instagram.com/mashmoclothing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => this.setState({ isOpen: false })}
                >
                  <HeaderIcon
                    src={igIcon}
                    alt={'instagram'}
                    style={{ width: '1.4rem', marginTop: '0.4rem' }}
                  />
                </IconExternalLink>
                <MailIconLink
                  to="/contact"
                  onClick={() => this.setState({ isOpen: false })}
                >
                  <HeaderIcon
                    src={mailIcon}
                    alt={'mail'}
                    style={{ width: '1.4rem', marginTop: '0.4rem' }}
                  />
                </MailIconLink>
              </div>
            </Ul>
          </DropdownMenu>
          <DesktopMenu>
            <DesktopMenuItem>
              <NavLink to="/" exact={true}>
                Начало
              </NavLink>
            </DesktopMenuItem>
            {/* <DesktopMenuItem>
              <NavLink to="/influencers">Инфлуенсъри</NavLink>
            </DesktopMenuItem> */}
            <DesktopMenuItem>
              <NavLink to="/gallery">Галерия</NavLink>
            </DesktopMenuItem>
            <DesktopMenuItem>
              <NavLink to="/info">Информация</NavLink>
            </DesktopMenuItem>
            <DesktopMenuItem>
              <FeaturedButtonLink to="/products">Продукти</FeaturedButtonLink>
            </DesktopMenuItem>
            <VerticalLine />

            <IconExternalLink
              href="https://www.facebook.com/mashmoclothing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HeaderIcon
                src={fbIcon}
                alt={'facebook'}
                style={{ width: '0.6rem' }}
              />
            </IconExternalLink>
            <IconExternalLink
              href="https://www.instagram.com/mashmoclothing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HeaderIcon
                src={igIcon}
                alt={'instagram'}
                style={{ width: '1.4rem', marginTop: '0.4rem' }}
              />
            </IconExternalLink>
            <MailIconLink to="/contact">
              <HeaderIcon
                src={mailIcon}
                alt={'mail'}
                style={{ width: '1.4rem', marginTop: '0.4rem' }}
              />
            </MailIconLink>
            <VerticalLine />

            <MailIconLink to="/cart">
              <div>
                <NotificationBadge
                  style={{ backgroundColor: colors.main }}
                  count={this.props.cartItemsCount}
                  effect={Effect.SCALE}
                />
                <HeaderIcon
                  src={cartIcon}
                  alt={'cart'}
                  style={{ width: '1.4rem' }}
                />
              </div>
            </MailIconLink>
          </DesktopMenu>
        </HeaderContainer>
      </HeaderContent>
    )
  }
}
