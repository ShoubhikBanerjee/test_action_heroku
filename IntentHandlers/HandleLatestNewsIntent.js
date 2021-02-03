const e = require("express");
const fetch = require('node-fetch');
var fs = require("fs")
const { updateFirebaseDocument, getLastNewsFromFirebase } = require("../FirebaseHandler");
const AppConfig = require('../Configs/AppConfig.json');
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();

module.exports.handleGetLatestNewsIntent = function (query_text, parameter, session = "null") {
    return new Promise(function (resolve, reject) {
        try {
            // var current_date = moment.tz(moment(), 'Asia/Kolkata').format('DD/MM/YYYY HH:mm');
            // getLastNewsFromFirebase().then(function (res) {
            //     console.log("Retrived : ::: ", res)
            //     var text = "Here is the latest news from NDTV : "
            //     var response_data = res.data;
            //     console.log("TYpe => ", typeof (response_data))
            //     response_data.map(function (content, index) {
            //         text += " \n\n " + content.topic;
            //         text += "\n " + content.headlines.join(",.  ");
            //     })
            //     console.log("News  => ", text)

            // }).catch(function (e) {
            //     console.log("Error : ", e)
            //     sendRejectResponse("Error : in fetchingnews from FB ! :(", reject)
            // });

            sendResolveResponse(fs.readFileSync("LatestNews.txt", "utf8"), resolve)

        } catch (e) {
            console.log("Error : ", e)
            sendRejectResponse("Error : " + e.toString(), reject)
        }

    });

    function sendRejectResponse(err_msg, reject) {

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