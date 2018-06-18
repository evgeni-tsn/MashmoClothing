import React from 'react'
import Helmet from 'react-helmet'
const items = JSON.parse(localStorage.getItem('cart')) || []

export default ({ data }) => {
  const productData = data.products
  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Price: {productData.price}</p>
      <p>URL: {productData.slug}</p>
      <button
        onClick={() => {
          //Need to add / update quantity
          //Remove items
          const item = { slug: productData.slug }
          items.push(item)
          localStorage.setItem('items', JSON.stringify(items))
          console.log(localStorage.getItem('cart'))
        }}
      >
        Add to Cart
      </button>
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
