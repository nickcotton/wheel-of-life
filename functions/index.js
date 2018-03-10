// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// Live SWU API Key
// const swuApiKey = 'live_23fe389b7297e8c6ee21502cb2fc02ae3358f0cc'

// Test SWU API Key
// const swuApiKey = 'test_4360c2f9fd77bc03c389de82c5c66817f0080e95'
const swuApiKey = functions.config().sendwithus.key

var api = require('sendwithus')(swuApiKey)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite((event) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return event.data.ref.parent.child('uppercase').set(uppercase);
});

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

exports.sendTestEmail = functions.https.onRequest((req, res) => {
  api.send({
    template: 'tem_VkmCXPBdS9VbprHtWRBmHWhY',
    recipient: {
      address: 'us@sendwithus.com'
    },
    template_data: {
      image_url: 'https://firebasestorage.googleapis.com/v0/b/wheel-of-life-fbfad.appspot.com/o/images%2Fwheel-1520697290?alt=media&token=106036f7-35d3-43c1-b060-0671ee02ead6'
    }
  });
})
