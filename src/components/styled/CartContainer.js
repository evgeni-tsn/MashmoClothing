import { Container } from './Container'

import styled from 'styled-components'
import colors from '../../utils/colors'

export const CartContainer = styled(Container)`
  background-color: ${colors.grey};
  @media only screen and (max-width: 767px) {
    background-color: ${colors.white};
  }
`
