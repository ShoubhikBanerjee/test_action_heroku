'use strict';
const express = require('express');

const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');

const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
//const app = dialogflow({debug:true});
const app = conversation();
var DelayedResponse = require('http-delayed-response');
const { handleGenerateLeaveMailIntent } = require('./IntentHandlers/HandlegenerateLeaveEmailItent');







const expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());


var router = express.Router();

router.get('/', function (req, res) {
  console.log("request in get > ", req);
  app.handle('sayHello', conv => {
    conv.add("Hi there! It\'s good to see you!");
  })
  res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/', function (req, res) {
  var intent_name = req.body.queryResult.intent.displayName;
  var query_text = req.body.queryResult.queryText;
  var intent_params = req.body.queryResult.parameters;

  console.log("Intent : ", intent_name);
  console.log("Query text : ", query_text);
  console.log("Intent Param : ", intent_params)
  if (intent_name === "generate_leave_email") {
    handleGenerateLeaveMailIntent(query_text, intent_params).then((result) => {
      console.log("1")
      sendReply(result, res)
    }).catch((err) => {
      console.log("2")
      sendReply(err, res)
    })
  }



  // var delayed = new DelayedResponse(req, res);
  // slowFunction(delayed.wait(), res);

});

function sendReply(response_json, response_callback) {
  console.log("9")
  response_callback.json({
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": response_json.msg
              }
            }
          ]
        }
      }
    }
  });
}

function slowFunction(callback, res) {
  // let's do something that could take a while...
  setTimeout(function () {
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
  }, 50000);
}


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
