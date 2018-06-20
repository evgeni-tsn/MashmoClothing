import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/colors'

const HR = styled.hr`
  border: 0;
  height: 2px;
  background: ${colors.main};
  background-image: linear-gradient(
    to right,
    ${colors.light},
    ${colors.main},
    ${colors.light}
  );
`

const StyledH1 = styled.h1`
  margin-left: 1rem;
  margin-bottom: 0.8rem;
  color: ${colors.black};
`

const H1 = ({ children, underlined }) => (
  <div>
    <StyledH1>{children}</StyledH1>
    {underlined && <HR />}
  </div>
)

H1.propTypes = {
  underlined: PropTypes.bool,
  children: PropTypes.any,
}

export default H1
