require('dotenv').config({ path: `.env` })

module.exports = {
  siteMetadata: {
    title: 'Mashmo Clothing',
    siteUrl: 'https://mashmoclothing.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/images/favicon.png',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: true,
          windows: true,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACEID,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'Mashmo Clothing',
    //     short_name: 'Mashmo',
    //     description: 'Mashmo Clothing Online Store',
    //     start_url: '/',
    //     background_color: '#BFA26E',
    //     theme_color: '#2A2A2A',
    //     display: 'standalone',
    //     icon: 'src/images/favicon.png', // This path is relative to the root of the site.
    //   },
    // },
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: '#BFA26E',
      },
    },
  ],
}
