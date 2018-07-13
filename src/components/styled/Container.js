import styled from 'styled-components'

import colors from '../../utils/colors'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1150px;
  padding: ${({ paddingHeight }) => (paddingHeight ? paddingHeight : '1.45rem')}
    ${({ paddingWidth }) => (paddingWidth ? paddingWidth : '1.6rem')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colors.white};
`
