import styled from 'styled-components'
import colors from '../../utils/colors'
import { StyledLink } from './StyledLink'

export const FeaturedButtonLink = styled(StyledLink)`
  border: 2px solid ${colors.main};
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.4rem 0.6rem;
  border-radius: 1rem;
  font-weight: lighter;

  &:hover {
    color: ${colors.black};
  }
`
