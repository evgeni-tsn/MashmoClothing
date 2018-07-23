import styled from 'styled-components'
import React from 'react'
import colors from '../../utils/colors'

const ErrorMsg = styled.div`
  color: ${colors.red};
  margin-top: -2.5rem;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
`
export const ErrorMsgDiv = ({ children }) => (
  <div>
    <ErrorMsg>{children}</ErrorMsg>
  </div>
)
