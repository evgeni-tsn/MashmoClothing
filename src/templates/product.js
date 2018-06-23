import React from 'react'
import H1 from '../components/styled/H1'
import FeaturedSection from '../components/FeaturedSection'

class ProductTemplate extends React.Component {
  state = {
    quantityValue: 1,
    disabledButton: false,
    errorMsgShow: false,
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
    this.setState({ quantityValue: event.target.value }, () => {
      Number(this.state.quantityValue) < 1
        ? this.setState({ disabledButton: true, errorMsgShow: true })
        : this.setState({ disabledButton: false, errorMsgShow: false })
    })
  }

  render() {
    const productData = this.props.data.products
    const allProducts = this.props.data.allProducts
    return (
      <div>
        <H1 underlined>{productData.name}</H1>
        <p>Price: {productData.price}</p>
        <p>URL: {productData.slug}</p>
        <input
          type="number"
          min={1}
          value={this.state.quantityValue}
          onChange={e => this.handleChange(e)}
        />
        <br />
        <button
          disabled={this.state.disabledButton}
          onClick={() => this.addToCart(productData)}
        >
          Add to Cart
        </button>
        {this.state.errorMsgShow && <p>Please add at least one item</p>}
        <FeaturedSection filterOut={productData} allProducts={allProducts} />
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
    allProducts {
      edges {
        node {
          id
          name
          price
          slug
          quantity
          onSale
          onSalePrice
          featured
        }
      }
    }
  }
`
