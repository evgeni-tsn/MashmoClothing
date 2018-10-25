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
  margin-top: 3rem !important;
  margin-bottom: 0.5rem !important;
  resize: none;

  &::placeholder {
    color: ${colors.black};
    opacity: 1;
  }

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
`
