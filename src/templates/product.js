import React from 'react'
import H1 from '../components/styled/H1'

export default ({ data }) => {
  const productData = data.products
  return (
    <div>
      <H1 underlined>{productData.name}</H1>
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
