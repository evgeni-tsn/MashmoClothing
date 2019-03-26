const contentful = require('contentful')
import { createClient as createManagementClient } from 'contentful-management'
import { getRandomNumber } from '../utils/utilFunctions'
import { calculateTotal } from '../utils/utilFunctions'

const SPACE_ID = '5l0wzl1wbtvw'

const client = createManagementClient({
  accessToken: process.env.GATSBY_CONTENTFUL_API_CALLS_TOKEN,
})

const clientContentfulFetch = contentful.createClient({
  space: SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_TOKEN,
})

export function checkDiscountCode(discountCode) {
  return clientContentfulFetch
    .getEntries({
      content_type: 'discountCode',
    })
    .then(response =>
      response.items.filter(code => code.fields.codeName === discountCode)
    )
    .catch(console.error)
}

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
          email: {
            'en-US': orderDetails.email,
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
          discountCode: orderDetails.discountCode || 'None',
          discountRate: orderDetails.discountRate || 0,
          total: orderDetails.discountRate
            ? calculateTotal(orderDetails.cartItems) -
              calculateTotal(orderDetails.cartItems) *
                orderDetails.discountRate /
                100
            : calculateTotal(orderDetails.cartItems),
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
