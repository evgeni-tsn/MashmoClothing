module.exports = {
  siteMetadata: {
    title: 'Mashmo Clothing',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'GatsbyJS',
        short_name: 'GatsbyJS',
        start_url: '/',
        background_color: '#F1F1F1',
        theme_color: '#f09a7a',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
      },
    },
    {
      resolve: `gatsby-source-firebase`,
      options: {
        credential: require('./firebase-key.json'),
        databaseURL: 'https://mashmo-on-gatsby-dev.firebaseio.com/',
        types: [
          {
            type: 'Products',
            path: 'products',
          },
        ],
      },
    },
  ],
}
