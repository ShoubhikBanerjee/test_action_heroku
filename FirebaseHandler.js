
var admin = require("firebase-admin");
var serviceAccount = require("./Keys/auto-bot-3c17c-firebase-adminsdk-rsdhn-19b8c738ab.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports.updateFirebaseDocument = function (document_name, key, value) {
    const docRef = db.collection('autobot-device-handler').where('device_name', '==', document_name);

    // Set the 'capital' field of the city
    const res = await docRef.update({ key: value });

}