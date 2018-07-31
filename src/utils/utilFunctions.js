export function totalAvailableQuantity(sizes) {
  return Object.values(sizes).reduce((total, curr) => total + Number(curr), 0)
}

export function calculateTotal(cartItems) {
  return cartItems.reduce(
    (total, curr) => total + Number(curr.price * curr.quantity),
    0
  )
}
