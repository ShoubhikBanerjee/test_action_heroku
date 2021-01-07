'use strict';
const express = require('express');

const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');

const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
//const app = dialogflow({debug:true});
const app = conversation();


app.handle('sayHello', conv => {
  conv.add("Hi there! It\'s good to see you!");
  })
  
 




const expressApp = express(); 
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());


var router = express.Router();  

router.get('/', function(req, res) {
	console.log("request in get > ", req);
app.handle('sayHello', conv => {
  conv.add("Hi there! It\'s good to see you!");
  })	
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/', function(req, res) {
	console.log("request in post > ", req.queryResult);
	
    res.json({
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "this is a Google Assistant response"
            }
          }
        ]
      }
    }
  }
});   
});


expressApp.use('/', router);
expressApp.listen(port);
console.log('Magic happens on port ' + port)


//exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
