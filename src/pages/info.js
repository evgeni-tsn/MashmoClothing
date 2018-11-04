import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-simple-flex-grid'

import { GhostButtonLink } from '../components/styled'

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
          Продуктите, предлагани в www.mashmoclothing.com се изпращат единствено
          и само чрез Еконт. Срокът за доставка е 1-3 работни дни след
          потвърждаване на поръчката. Доставката се извършва от куриерска фирма
          Еконт Експрес до офис, като транспортните разходи са за наша сметка.
          Плащането се извършва чрез наложен платеж при получаване на стоката.
          Всички продукти се изпращат с опцията преглед и тест.
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
          <ul style={{ listStyleType: 'none', margin: 0 }}>
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
    <Row justify="center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <GhostButtonLink to="/products">
        Към продуктите <CharSpan>→</CharSpan>{' '}
      </GhostButtonLink>
    </Row>
  </div>
)

export default Info
