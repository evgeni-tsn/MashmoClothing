import { createClient } from 'contentful-management'
const client = createClient({
  accessToken:
    'CFPAT-a3c4195e56d45acec59f1d671ce4ddb1df01f678f98e3fec9549a6e07567e354',
})

export function tryContentfulAPI() {
  client
    .getSpace('ng68lttvxpth')
    .then(space => space.getEntry('3YZ160MgHS6OW6Ue4eAqKQ'))
    .then(entry => {
      entry.fields.price['en-US'] = 33
      return entry.update()
    })
    .then(entry => console.log(`Entry ${entry.sys.id} updated.`))
    .catch(console.error)
}

export function createOrder() {
  client
    .getSpace('ng68lttvxpth')
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
