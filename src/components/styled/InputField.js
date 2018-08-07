import styled from 'styled-components'
import Input from 'react-validation/build/input'

import colors from '../../utils/colors'

export const InputField = styled(Input)`
  display: block;
  margin: 0 auto;
  width: 60%;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${colors.main};
  margin-bottom: 3rem !important;

  &::placeholder {
    color: ${colors.black};
    opacity: 1;
  }

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`
