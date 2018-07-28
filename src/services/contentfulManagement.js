import { createClient } from 'contentful-management'

const client = createClient({
  accessToken: process.env.GATSBY_CONTENTFUL_API_CALLS_TOKEN,
})

export function createOrder(orderDetails) {
  let orderedItemsStr = ''
  orderDetails.cartItems.forEach(item => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const element = item[key]
        orderedItemsStr += `${key}: ${element} | `
      }
    }
    orderedItemsStr += '\n'
  })

  console.log(orderedItemsStr)
  return client
    .getSpace('5l0wzl1wbtvw')
    .then(space => space.getEnvironment('master'))
    .then(environment =>
      environment.createEntry('order', {
        fields: {
          firstName: {
            'en-US': orderDetails.firstName,
          },
          lastName: {
            'en-US': orderDetails.lastName,
          },
          phone: {
            'en-US': orderDetails.phone,
          },
          econt: {
            'en-US': orderDetails.econt,
          },
          city: {
            'en-US': orderDetails.city,
          },
          note: {
            'en-US': orderDetails.note,
          },
          orderedProducts: {
            'en-US': orderedItemsStr,
          },
        },
      })
    )
}
