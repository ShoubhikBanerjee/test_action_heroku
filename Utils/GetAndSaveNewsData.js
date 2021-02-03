const fetch = require('node-fetch');
const { insertFirebaseDocument } = require("../FirebaseHandler");
const AppConfig = require('../Configs/AppConfig.json');
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();



module.exports.fetchAndSaveNewsData = function () {
    var url = AppConfig.URL_LATEST_NEWS;
    var current_date = moment.tz(moment(), 'Asia/Kolkata').format('DD-MM-YYYY HH:mm');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status === 200) {
               
                insertFirebaseDocument(current_date, data)
            } else {
                insertFirebaseDocument(current_date, "Error : in fetching latest news!!!")
            }
        })
        .catch(err => {
            console.error(err)
            insertFirebaseDocument(current_date, "Error : " + err.toString())
        });
};