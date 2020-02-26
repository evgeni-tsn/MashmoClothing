import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import tempHeroImage from '../images/tempHeroImage.jpg'
import { Header, Footer } from '../components'
import { Container } from '../components/styled'
import favicon from '../images/favicon.png'

import './index.css'

const MainContainer = styled(Container)`
  margin-top: 1.5rem;
  min-height: 75vh;
  @media only screen and (max-width: 767px) {
    margin-top: 0rem;
  }
`

//TODO: Experimental
const TempImage = styled.img`
  width: 100%;
  height: 440px;
  object-fit: cover;

  @media only screen and (max-width: 1220px) {
    height: 300px;
  }
  @media only screen and (max-width: 767px) {
    height: 200px;
  }
  @media only screen and (max-width: 580px) {
    height: 140px;
  }
`
const GatsbyImage = styled(Img)`
  width: 100%;
  height: 440px;

  @media only screen and (max-width: 1220px) {
    height: 300px;
  }
  @media only screen and (max-width: 767px) {
    height: 200px;
  }
  @media only screen and (max-width: 580px) {
    height: 140px;
  }
`

class Template extends React.Component {
  state = {
    cartItemsCount: 0,
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('cart')) {
        this.setState({
          cartItemsCount: JSON.parse(localStorage.getItem('cart')).length || 0,
        })
      } else {
        localStorage.setItem('cart', '[]')
      }
    }
  }

  updateCartItemsCount = updatedCount => {
    this.setState({ cartItemsCount: updatedCount })
  }

  render() {
    const { children, data, location } = this.props
    const heroImageData = data.allContentfulHeroImage.edges[0].node.heroImage
    const siteTitleData = data.site.siteMetadata.title

    return (
      <div>
        <Helmet
          title={siteTitleData}
          meta={[
            {
              name: 'description',
              content:
                'Mashmo Clothing е уличен бранд, който тръгва от Варна, България. Основното вдъхновение за стила на дрехите са хип-хоп музиката и начинът на живот, който жанра представлява. Идеята на Mashmo Clothing е да събере всеки, който разпознава себе си в тази мода в една голяма общност.',
            },
            {
              name: 'google-site-verification',
              content: 'S_qSIx0NOYSyYzwG1E05WUXft7cAowd5bDVHxRzwRzc',
            },
            {
              name: 'keywords',
              content:
                'Mashmo, MashmoClothing, Clothing, Brand, Style, Clothes',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
          ]}
          link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
            {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css?family=Montserrat',
            },
            {
              rel: 'stylesheet',
              href:
                'https://fonts.googleapis.com/css?family=Kaushan+Script|Lato&display=swap',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        {/* TODO: Publish Back */}
        {/* <Header cartItemsCount={this.state.cartItemsCount} /> */}
        <main>
          {/* TODO: Publish Back */}
          {/* {location.pathname === '/' && (
            // <TempImage src={heroImageData.resolutions.src} srcSet={heroImageData.resolutions.srcSet} alt={'Hero Image'} />
            <GatsbyImage
              resolutions={heroImageData.resolutions}
              alt={'Hero Image'}
            />
          )} */}
          <MainContainer>
            {children({
              ...this.props,
              updateCartItemsCount: this.updateCartItemsCount,
            })}
          </MainContainer>
        </main>
        {/* TODO: Publish Back */}
        {/* <Footer /> */}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
}

export default Template

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
            resolutions(width: 1400, quality: 60) {
              tracedSVG
              src
              srcSet
            }
          }
        }
      }
    }
  }
`
