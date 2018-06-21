import styled from 'styled-components'
import colors from '../../utils/colors'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1060px;
  padding: ${({ height }) => (height ? height : '1.45rem')}
    ${({ width }) => (width ? width : '1.6rem')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.white};
`
