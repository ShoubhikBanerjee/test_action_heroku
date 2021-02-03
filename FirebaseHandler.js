
var admin = require("firebase-admin");
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
var serviceAccount = require("./Keys/auto-bot-3c17c-firebase-adminsdk-rsdhn-19b8c738ab.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports.updateFirebaseDocument = function (document_name, key, value, temp_custom_directory) {

    var key2 = ("app_trigger_config." + key).toString();
    console.log("document_name => ", document_name)
    var docRef = db.collection('autobot-device-handler').doc(document_name)
    var jsonVariable = {};
    jsonVariable[key2] = value;
    jsonVariable["temp_value_custom_dir"] = temp_custom_directory;
    console.log("JSON => ", jsonVariable)
    var res = docRef.update(jsonVariable)
        .then(function () {
            console.log("Update : ")
            return true
        }).catch(function (e) {
            console.log("Error : ", e)
            return false
        });
    console.log(res)

}

module.exports.insertFirebaseDocument = function (document_name, data) {

    console.log("document_name => ", document_name)
    var docRef = db.collection('autobot-news-data').doc(document_name)
    data['created_at'] = moment.tz(moment(), 'Asia/Kolkata').format('DD-MM-YYYY HH:mm')
    var res = docRef.set(data)
        .then(function () {
            console.log("Added : ")
            return true
        }).catch(function (e) {
            console.log("Error : ", e)
            return false
        });
    console.log(res)

}

module.exports.getLastNewsFromFirebase = function () {

    return new Promise(function (resolve, reject) {
        //var docRef = db.collection('autobot-news-data')
        db.collection("autobot-news-data")
            .orderBy('created_at', 'desc') // Order documents by added_at field in descending order
            .limit(1).get().then(function (prevSnapshot) {
                console.log("Retrived : ", prevSnapshot.docs[0].data())
                resolve(prevSnapshot.docs[0].data())
            }).catch(function (err) {
                console.error(err)
                reject(false)
            })

    });


}