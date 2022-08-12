const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();



 
 exports.testFunction = functions.firestore
    .document('player-selection/{selection}').onCreate( (snap, context) => {
      const newd = snap.data();

      console.log(newd); 
      console.log('Hello')
      db.addDoc('collections')
    });

    