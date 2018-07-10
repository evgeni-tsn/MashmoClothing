import styled from 'styled-components'
import colors from '../../utils/colors'

export const InputField = styled.input`
  display: block;
  margin: 0 auto;
  width: 40%;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${colors.main};
  margin-bottom: 3rem !important;

  &::placeholder {
    color: ${colors.black};
    opacity: 1;
  }
`
