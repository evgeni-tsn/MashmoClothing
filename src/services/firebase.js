import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyA57XPD8uDr4qnzN0sAlwvIh-Y5AnKz-A8',
  authDomain: 'mashmo-on-gatsby-dev.firebaseapp.com',
  databaseURL: 'https://mashmo-on-gatsby-dev.firebaseio.com',
  projectId: 'mashmo-on-gatsby-dev',
  storageBucket: 'mashmo-on-gatsby-dev.appspot.com',
  messagingSenderId: '596546983734',
}

firebase.initializeApp(config)

// Get a reference to the database service
const database = firebase.database()

export function writeUserData(productId) {
  console.log(productId)
  return database
    .ref('products/' + productId)
    .once('value')
    .then(function(snapshot) {
      console.log(snapshot)
      let price = snapshot.val() && snapshot.val().price
      console.log(price)
      return database.ref('products/' + productId).set({
        ...snapshot.val(),
        price: price + 23,
      })
    })
}
