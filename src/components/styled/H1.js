import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '../../utils/colors'

const HR = styled.hr`
  border: 0;
  height: 2px;
  width: 75%;
  background: ${colors.main};
  background-image: linear-gradient(
    to right,
    ${colors.light},
    ${colors.main},
    ${colors.light}
  );
`

const StyledH1 = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.87rem;
  color: ${colors.black};
  text-align: ${({ centered }) => centered && 'center'};
`

export const H1 = ({ children, underlined, centered, faded }) => (
  <div>
    <StyledH1 faded={faded} centered={centered}>
      {children}
    </StyledH1>
    {underlined && <HR />}
  </div>
)

H1.propTypes = {
  underlined: PropTypes.bool,
  children: PropTypes.any,
}
