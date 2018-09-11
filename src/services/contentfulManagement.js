import { createClient } from 'contentful-management'
import { getRandomNumber } from '../utils/utilFunctions'

const client = createClient({
  accessToken: process.env.GATSBY_CONTENTFUL_API_CALLS_TOKEN,
})

const SPACE_ID = '5l0wzl1wbtvw'

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

  return client
    .getSpace(SPACE_ID)
    .then(space => space.getEnvironment('master'))
    .then(environment =>
      environment.createEntry('order', {
        fields: {
          orderId: {
            'en-US': getRandomNumber(10000, 99999),
          },
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

export function updateEntry(product) {
  const updateId = product.contentful_id
  client
    .getSpace(SPACE_ID)
    .then(space => space.getEnvironment('master'))
    .then(environment => environment.getEntry(updateId))
    .then(entry => {
      for (let i = 0; i < product.selectedSize.length; i++) {
        entry.fields.sizes['en-US'][product.selectedSize[i]] -=
          product.quantity[i]
      }
      return entry.update()
    })
    .then(entry => entry.publish())
    .catch(console.error)
}
