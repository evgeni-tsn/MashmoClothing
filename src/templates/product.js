import React from 'react'
import Helmet from 'react-helmet'

export default ({ data }) => {
  const productData = data.products
  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Price: {productData.price}</p>
      <p>URL: {productData.slug}</p>
    </div>
  )
}

export const productQuery = graphql`
  query ProductQuery($slug: String!) {
    products(slug: { eq: $slug }) {
      id
      name
      price
      slug
    }
  }
`
