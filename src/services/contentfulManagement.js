import { createClient } from 'contentful-management'

const client = createClient({
  accessToken: process.env.GATSBY_CONTENTFUL_API_CALLS_TOKEN,
})

export function createOrder() {
  client
    .getSpace('5l0wzl1wbtvw')
    .then(space => space.getEnvironment('master'))
    .then(environment =>
      environment.createEntry('order', {
        fields: {
          name: {
            'en-US': 'First Customer',
          },
          phone: {
            'en-US': '0888888888',
          },
          econtAddress: {
            'en-US': 'Sofia Business Park',
          },
        },
      })
    )
    .then(entry => console.log(entry))
    .catch(console.error)
}
