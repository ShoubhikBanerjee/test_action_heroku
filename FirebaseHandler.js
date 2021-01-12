
var admin = require("firebase-admin");
var serviceAccount = require("./Keys/auto-bot-3c17c-firebase-adminsdk-rsdhn-19b8c738ab.json");

module.exports.updateFirebaseDocument = function (document_name, key, value) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    
    const db = admin.firestore();
    var key2 = ("app_trigger_config." + key).toString();
    console.log("document_name => ", document_name)
    var docRef = db.collection('autobot-device-handler').doc(document_name)
    var jsonVariable = {};
    jsonVariable[key2] = value; 
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