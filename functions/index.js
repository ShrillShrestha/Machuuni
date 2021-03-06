const functions = require("firebase-functions");

const express = require('express');
//require('dotenv').config();

const mapRoute = require('./Routes/mapRoute');
const corsMiddleware = require ('./Middlewares/corsAllowOrigin');

const app = express();

app.use('/api/map', corsMiddleware.setCorsAuth, mapRoute);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api= functions.https.onRequest(app);