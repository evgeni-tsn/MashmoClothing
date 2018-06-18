import styled from 'styled-components'
import colors from '../../utils/colors'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1060px;
  padding: 1.45rem 1.0875rem;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.white};
`
