import styled from 'styled-components'

import colors from '../../utils/colors'

export const TextAreaField = styled.textarea`
  display: block;
  margin: 0 auto;
  width: 60%;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${colors.main};
  margin-bottom: 3rem !important;
  resize: none;

  &::placeholder {
    color: ${colors.black};
    opacity: 1;
  }
`
