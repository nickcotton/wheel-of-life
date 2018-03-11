// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const swuApiKey = functions.config().sendwithus.key

var api = require('sendwithus')(swuApiKey)

exports.sendEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'email': 'x@x.com', 'image_url': 'string'}
    const user = event.data.data();

    // access a particular field as you would any JS property
    const email = user.email;
    const image_url = user.image_url;

    api.send({
      template: 'tem_VkmCXPBdS9VbprHtWRBmHWhY',
      recipient: {
        address: email
      },
      template_data: {
        image_url: image_url
      }
    });
  })
