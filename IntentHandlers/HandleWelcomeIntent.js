const e = require("express");
const fetch = require('node-fetch');
const { updateFirebaseDocument } = require("../FirebaseHandler");
const WelcomeResponses = require('../Configs/WelcomeResponses.json');
var moment = require('moment-timezone');
const { chooseTemplateViaLength } = require("../Utils/ChooseTemplateIndex");
const { fetchAndSaveNewsData } = require("../Utils/GetAndSaveNewsData");
moment().tz("Asia/Kolkata").format();

module.exports.handleWelcomeIntent = function (query_text, parameter, session = "null") {
    return new Promise(function (resolve, reject) {
        try {
           
            var index_to_choose = chooseTemplateViaLength(WelcomeResponses.length, return_count = 1)[0]
            // console.log("Index to choose => ", index_to_choose)
            // console.log("Element => ", WelcomeResponses[index_to_choose])
            sendResolveResponse(WelcomeResponses[index_to_choose], resolve)
            console.log("8")
            fetchAndSaveNewsData()
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