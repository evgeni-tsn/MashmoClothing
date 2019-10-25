import React from 'react'
import styled from 'styled-components'
import { FeaturedButtonLink, H1 } from '../components/styled'

import colors from '../utils/colors'

const FeaturesFeaturedButtonLink = styled(FeaturedButtonLink)`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.1rem;
`

class Features extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <H1>Фийчъри</H1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '55%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <FeaturesFeaturedButtonLink to="/products">
              Продукти
            </FeaturesFeaturedButtonLink>
            <FeaturesFeaturedButtonLink to="/info">
              Информация
            </FeaturesFeaturedButtonLink>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <FeaturesFeaturedButtonLink
            style={{ width: '55%', textAlign: 'center' }}
            to="/"
          >
            Запиши се за фийчър
          </FeaturesFeaturedButtonLink>
        </div>
      </div>
    )
  }
}

export default Features
