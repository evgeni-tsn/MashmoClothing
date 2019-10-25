import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '../../utils/colors'

export const H1 = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.87rem;
  color: ${colors.black};
  text-align: ${({ centered }) => centered && 'center'};
`
