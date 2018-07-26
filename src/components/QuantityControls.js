import React from 'react'
import styled from 'styled-components'

import colors from '../utils/colors'

const QuantityButton = styled.button`
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${colors.fullBlack};
  outline: none;

  &:disabled {
    color: ${colors.grey};
  }
`

const QuantitySpan = styled.span`
  display: inline-block;
  padding: 0.4rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  padding-top: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${colors.main};
`
const QuantityControlsStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export class QuantityControls extends React.Component {
  render() {
    return (
      <QuantityControlsStyled>
        <QuantityButton
          onClick={() => this.props.decreaseTrigger()}
          disabled={this.props.disableMinusButton}
        >
          –
        </QuantityButton>
        <QuantitySpan>{this.props.value}</QuantitySpan>
        <QuantityButton
          onClick={() => this.props.increaseTrigger()}
          disabled={this.props.disablePlusButton}
        >
          +
        </QuantityButton>
      </QuantityControlsStyled>
    )
  }
}
