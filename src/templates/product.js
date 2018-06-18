import React from 'react'

export default ({ data }) => {
  const productData = data.products
  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Price: {productData.price}</p>
      <p>URL: {productData.slug}</p>
      <button>Add to Cart</button>
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
