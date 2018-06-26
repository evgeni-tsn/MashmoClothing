module.exports = {
  siteMetadata: {
    title: 'Mashmo Clothing',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ng68lttvxpth`,
        accessToken: `e02159a779e1d982b3f98b8bdcba8eadb078193ed9d3700781fd8093efe5bfe2`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Mashmo Clothing',
        short_name: 'Mashmo',
        description: 'Mashmo Clothing Online Store',
        start_url: '/',
        background_color: '#F1F1F1',
        theme_color: '#BFA26E',
        display: 'standalone',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
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
        color: `tomato`,
      },
    },
  ],
}
