import styled from 'styled-components'
import { StyledLink } from './StyledLink'

import colors from '../../utils/colors'

export const GhostButtonLink = styled(StyledLink)`
  display: inline-block;
  text-align: center;
  min-width: 15rem;
  border: none;
  color: ${colors.main};
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;
  border: 1px solid transparent;

  &:hover {
    text-decoration: underline;
    /* border: 1px solid ${colors.main};
    border-radius: 1rem; */
  }
`
