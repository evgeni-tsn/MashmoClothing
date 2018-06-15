module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
