import styled from 'styled-components'

import colors from '../../utils/colors'

export const InputField = styled.input`
  display: block;
  margin: 0 auto;
  width: 60%;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${colors.main};
  margin-bottom: 0.5rem !important;
  margin-top: 3rem !important;

  &::placeholder {
    color: ${colors.black};
    opacity: 1;
  }

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`
