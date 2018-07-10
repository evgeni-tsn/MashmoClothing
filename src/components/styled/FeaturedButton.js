import styled from 'styled-components'
import colors from '../../utils/colors'

export const FeaturedButton = styled.button`
  border: 2px solid ${colors.main};
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.4rem 0.6rem;
  border-radius: 0.75rem;
  width: 15%;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;

  &:hover {
    color: ${colors.black};
    cursor: pointer;
  }
`
