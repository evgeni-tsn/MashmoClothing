import React from 'react'
import styled from 'styled-components'

import colors from '../utils/colors'

const SizeButton = styled.button`
  background-color: transparent;
  display: inline-block;
  padding: 0.4rem;
  min-width: 2rem;
  height: 2rem;
  text-align: center;
  padding-top: 0.25rem;
  border-radius: 0.25rem;
  margin-left: 0.4rem;
  border: ${props =>
    props.active ? `1px solid ${colors.main}` : `1px solid ${colors.grey}`};
  outline: none;
`

export class SizesButtonGroup extends React.Component {
  render() {
    return (
      <div>
        {this.props.sizes.map(button => (
          <SizeButton
            active={this.props.selected === button}
            onClick={e => this.props.onChange(e.target)}
            key={button}
            id={button}
          >
            {button === 'OneSize' ? 'One Size' : button}
          </SizeButton>
        ))}
      </div>
    )
  }
}
