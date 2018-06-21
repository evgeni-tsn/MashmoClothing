import React from 'react'
import H1 from '../components/styled/H1'

class ProductTemplate extends React.Component {
  state = {
    quantityValue: 1,
  }

  addToCart = productData => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let oldItems = JSON.parse(localStorage.getItem('cart')) || []
      let updateQuantity = false
      for (const savedItem of oldItems) {
        if (savedItem.id === productData.id) {
          updateQuantity = true
          savedItem.quantity =
            Number(this.state.quantityValue) + Number(savedItem.quantity)
        }
      }

      if (!updateQuantity)
        oldItems.push({ ...productData, quantity: this.state.quantityValue })
      localStorage.setItem('cart', JSON.stringify(oldItems))
    }
  }

  handleChange(event) {
    this.setState({ quantityValue: event.target.value })
  }

  render() {
    const productData = this.props.data.products
    return (
      <div>
        <H1 underlined>{productData.name}</H1>
        <p>Price: {productData.price}</p>
        <p>URL: {productData.slug}</p>
        <input
          type="number"
          min="1"
          value={this.state.quantityValue}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <button onClick={() => this.addToCart(productData)}>Add to Cart</button>
      </div>
    )
  }
}

export default ProductTemplate

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
