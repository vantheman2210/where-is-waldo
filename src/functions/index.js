import { https, logger } from "firebase-functions";

import { initializeApp } from 'firebase-admin';
initializeApp();

export const helloWorld = https.onRequest((request, response) => {
  console.log('hello')
   logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

 helloWorld();