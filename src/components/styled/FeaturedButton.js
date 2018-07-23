import styled from 'styled-components'
import Button from 'react-validation/build/button'

import colors from '../../utils/colors'

export const FeaturedButton = styled.button`
  border: none;
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;

  &:hover {
    color: ${colors.black};
    cursor: pointer;
    box-shadow: 0px 1px 8px 0px ${colors.dark};
  }
`
export const SubmitButton = styled(Button)`
  border: none;
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;

  &:hover {
    color: ${colors.black};
    cursor: pointer;
    box-shadow: 0px 1px 8px 0px ${colors.dark};
  }

  &:disabled {
    cursor: auto;
    background-color: ${colors.darkGrey};
  }
`
