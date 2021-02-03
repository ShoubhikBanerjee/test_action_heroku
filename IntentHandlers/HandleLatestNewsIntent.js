const e = require("express");
const fetch = require('node-fetch');
const { updateFirebaseDocument } = require("../FirebaseHandler");
const AppConfig = require('../Configs/AppConfig.json');
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();

module.exports.handleGetLatestNewsIntent = function (query_text, parameter, session = "null") {
    return new Promise(function (resolve, reject) {
        try {
            // var current_date = moment.tz(moment(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm');
            console.log("4")
           
            // // request({
            // //     uri: AppConfig.URL_LATEST_NEWS,
            // //     qs: {
            // //         api_key: '123456',
            // //         query: 'World of Warcraft: Legion'
            // //     },
            // //     function(error, response, body) {
            // //         console.log("5")
            // //         if (!error && response.statusCode === 200 && body.status === 200) {
            // //             console.log("6")
            // //             console.log(body);
            // //             var text = "Here is the latest news from NDTV : "
            // //             var data = body.data;
            // //             data.map(function (content, index) {
            // //                 text += " \n\n " + content.topic;
            // //                 text += "\n " + content.headlines.join(",.  ");
            // //             })
            // //             console.log("News  => ", text)
            // //             sendResolveResponse(text, resolve)
            // //         } else {
            // //             console.log("7")
            // //             console.log("here")
            // //             sendRejectResponse("Error : " + error.toString(), reject)
            // //         }
            // //     }

            // });
            console.log("8")
        } catch (e) {
            console.log("Error : ", e)
            sendRejectResponse("Error : " + e.toString(), reject)
        }

    });

    function sendRejectResponse(err_msg, reject) {
        console.log(42)
        var response = {
            "msg": err_msg,
            "meta_data": "meta_data",
            "session": session
        }
        reject(response);
        console.log('Oops, an error occured %s', err_msg);
    }

    function sendResolveResponse(msg, resolve, meta_data = null) {
        console.log("5")
        var response = {
            "msg": msg,
            "meta_data": meta_data,
            "session": session
        }
        resolve(response);
        // return res;
    }

}