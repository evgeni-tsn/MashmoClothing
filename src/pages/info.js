import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'

import { FeaturedButtonLink } from '../components/styled'

const SectionHeading = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`

const Paragraph = styled.p`
  font-size: 0.9rem;
  text-align: center;
`

const CharSpan = styled.span`
  font-size: 2rem;
`
const HomeFeaturedButtonLink = styled(FeaturedButtonLink)`
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

const Info = () => (
  <div>
    <Row gutter={60}>
      <Col
        xs={{ span: 12 }}
        sm={{ span: 12 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 8, offset: 2 }}
        xl={{ span: 8, offset: 2 }}
        style={{ marginBottom: '2rem' }}
      >
        <SectionHeading>Доставка</SectionHeading>
        <Paragraph>
          Доставката се извършва чрез куриерска фирма Еконт. <br />Машмо Ви
          праща дрехите в срок от 1-3 работни дни след, като получите
          потвърждение на оставения e-mail. <br />Плащането се извършва, чрез
          наложен платеж. <br />Транспортните разходи са за сметка на Mashmo
          Clothing. <br />Всички продукти се изпращат с опцията преглед и тест.
        </Paragraph>
      </Col>
    </Row>
    <Row gutter={60}>
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ marginBottom: '2rem' }}
      >
        <SectionHeading>Контакти</SectionHeading>
        <Paragraph>
          <ul style={{ textAlign: 'center', listStyleType: 'none', margin: 0 }}>
            <li>
              <a href="mailto:mashmoclothing@gmail.com" target="_top">
                mashmoclothing@gmail.com
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.m.me/mashmoclothing">
                Messenger
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.instagr.am/mashmoclothing">
                Instagram
              </a>
            </li>
          </ul>
        </Paragraph>
      </Col>
    </Row>
    <ButtonsRow>
      <HomeFeaturedButtonLink to="/">Начало</HomeFeaturedButtonLink>
    </ButtonsRow>
    <ButtonsRow>
      <HomeFeaturedButtonLink to="/products">Продукти</HomeFeaturedButtonLink>
    </ButtonsRow>
    <ButtonsRow>
      <HomeFeaturedButtonLink to="/features">Фийчъри</HomeFeaturedButtonLink>
    </ButtonsRow>
  </div>
)

export default Info
