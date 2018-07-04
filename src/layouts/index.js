import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '../components/styled/Container'
import './index.css'

const MainContainer = styled(Container)`
  min-height: 75vh;
`

//TODO: Experimental
const GatsbyImage = styled(Img)`
  width: 100%;
  height: 440px;

  @media only screen and (max-width: 1220px) {
    height: 200px;
  }
  @media only screen and (max-width: 580px) {
    height: 100px;
  }
`
const Layout = ({ children, data, location }) => {
  const heroImageData = data.allContentfulHeroImage.edges[0].node.heroImage
  const siteTitleData = data.site.siteMetadata.title
  console.log(heroImageData)
  return (
    <div>
      <Helmet
        title={siteTitleData}
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
        {console.log()}
        {location.pathname === '/' && (
          <GatsbyImage
            resolutions={heroImageData.resolutions}
            alt={'Hero Image'}
          />
        )}
        <MainContainer>{children()}</MainContainer>
      </main>
      <Footer />
    </div>
  )
}

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
    allContentfulHeroImage {
      edges {
        node {
          heroImage {
            title
            resolutions(width: 1920, quality: 70) {
              tracedSVG
              src
            }
          }
        }
      }
    }
  }
`
