import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '../components/styled/Container'
import './index.css'

import heroImage from '../images/hero.png'

const MainContainer = styled(Container)`
  min-height: 75vh;
`
const Layout = ({ children, data, location }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <html lang="en" />
    </Helmet>
    <Header />
    <main>
      {location.pathname === '/' && (
        <div>
          <img src={heroImage} alt={'Hero Image'} />
        </div>
      )}
      <MainContainer>{children()}</MainContainer>
    </main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
