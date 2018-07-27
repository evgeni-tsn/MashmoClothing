import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Header, Footer } from '../components'
import { Container } from '../components/styled'

import './index.css'

const MainContainer = styled(Container)`
  margin-top: 1.5rem;
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
        <Header cartItemsCount={this.state.cartItemsCount} />
        <main>
          {location.pathname === '/' && (
            <GatsbyImage
              resolutions={heroImageData.resolutions}
              alt={'Hero Image'}
            />
          )}
          <MainContainer>
            {children({
              ...this.props,
              updateCartItemsCount: this.updateCartItemsCount,
            })}
          </MainContainer>
        </main>
        <Footer />
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
