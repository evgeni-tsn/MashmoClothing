import styled from 'styled-components'
import Link from 'gatsby-link'
import colors from '../../utils/colors'

export const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${({ light }) => (light ? colors.white : colors.black)};
  font-weight: lighter;
`
