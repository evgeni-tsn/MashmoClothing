import styled from 'styled-components'

import colors from '../../utils/colors'

export const FeaturedButton = styled.button`
  border: ${({ grayedOut }) =>
    grayedOut ? `1px solid ${colors.darkGrey}` : 'none'};
  background-color: ${({ grayedOut }) =>
    grayedOut ? colors.white : colors.main};
  color: ${({ grayedOut }) => (grayedOut ? colors.darkGrey : colors.white)};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;

  &:hover {
    color: ${colors.black};
    cursor: ${({ grayedOut }) => (grayedOut ? 'auto' : 'pointer')};
    box-shadow: ${({ grayedOut }) =>
      grayedOut ? 'none' : `0px 1px 8px 0px ${colors.dark}`};
  }

  &:disabled {
    cursor: auto;
    background-color: ${colors.white};
    color: ${colors.darkGrey};
    border: 1px solid ${colors.darkGrey};
  }
`
export const SubmitButton = styled.button`
  border: none;
  text-align: center;
  min-width: 15rem;
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: lighter;
  text-transform: uppercase;
  outline: none;
  margin-top: 2rem;

  &:hover {
    /* color: ${colors.black}; */
    cursor: pointer;
    box-shadow: 0px 1px 8px 0px ${colors.dark};
  }

  &:disabled:hover {
    box-shadow: none;
  }

  &:disabled {
    cursor: auto;
    background-color: ${colors.white};
    color: ${colors.darkGrey};
    border: 1px solid ${colors.darkGrey};
  }
`
