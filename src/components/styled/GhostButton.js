import styled from 'styled-components'

import colors from '../../utils/colors'

export const GhostButton = styled.button`
  border: none;
  color: ${colors.main};
  background-color: transparent;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;
  border: 1px solid transparent;

  &:hover {
    color: ${colors.darkGrey};
    /* border: 1px solid ${colors.main}; */
    /* border-radius: 1rem; */
    cursor: pointer;
  }
`
