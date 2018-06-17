const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const productTemplate = path.resolve('src/templates/product.js')

  return graphql(`
    {
      allProducts {
        edges {
          node {
            id
            name
            price
            slug
            path
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      console.error(res.errors)
      return Promise.reject(res.errors)
    }

    res.data.allProducts.edges.forEach(({ node }) => {
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
