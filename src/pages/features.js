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
  text-align: center;
  width: 40%;
  @media only screen and (max-width: 660px) {
    display: block !important;
    margin: 0 auto;
    margin-top: 1rem;
    width: 80%;
  }
`

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 1rem;
  @media only screen and (max-width: 660px) {
    display: block !important;
  }
`

class Features extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <H1>Фийчъри</H1>

        <ButtonsRow>
          <FeaturesFeaturedButtonLink to="/products">
            Продукти
          </FeaturesFeaturedButtonLink>
        </ButtonsRow>
        <ButtonsRow>
          <FeaturesFeaturedButtonLink to="/info">
            Информация
          </FeaturesFeaturedButtonLink>
        </ButtonsRow>
        <ButtonsRow>
          <FeaturesFeaturedButtonLink to="/">
            Запиши се за фийчър
          </FeaturesFeaturedButtonLink>
        </ButtonsRow>
      </div>
    )
  }
}

export default Features
