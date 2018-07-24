export function totalAvailableQuantity(sizes) {
  return Object.values(sizes).reduce((total, curr) => total + Number(curr), 0)
}
