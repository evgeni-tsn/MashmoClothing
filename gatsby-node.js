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
            isFeatured
            isOnSale
            onSalePrice
            price
            description
            sizes {
              XS
              S
              M
              L
              XL
              OneSize
            }
            contentful_id
            createdAt
            photos {
              id
              resolutions(width: 500, height: 500) {
                src
              }
            }
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
