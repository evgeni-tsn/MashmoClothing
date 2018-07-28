import styled from 'styled-components'
import { StyledLink } from './StyledLink'

import colors from '../../utils/colors'

export const FeaturedButtonLink = styled(StyledLink)`
  border: none;
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;

  &:hover {
    color: ${colors.white};
    box-shadow: 0px 1px 8px 0px ${colors.dark};
  }

  &:disabled {
    cursor: auto;
    background-color: ${colors.white};
    color: ${colors.darkGrey};
    border: 1px solid ${colors.darkGrey};
  }
`
