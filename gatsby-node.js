const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const productTemplate = path.resolve('src/templates/product.js')

  return graphql(`
    {
      allContentfulProduct {
        edges {
          node {
            slug
            name
            featured
            onSale
            onSalePrice
            price
            quantity
            contentfulid
            contentful_id
            createdAt
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      console.error(res.errors)
      return Promise.reject(res.errors)
    }

    res.data.allContentfulProduct.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: productTemplate,
        context: {
          slug: node.slug,
        },
      })
    })
  })
}
