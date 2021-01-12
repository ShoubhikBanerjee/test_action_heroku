// const { sendEmail } = require("./Utils/SendEmail");

const { updateFirebaseDocument } = require("./FirebaseHandler");

// sendEmail("shoubhik@hexaride.com","Test", "test")


// var moment = require('moment-timezone');
// moment().tz("Asia/Kolkata").format();

// var date1 = "18-01-2021"
// var date2= moment(date1, "DD-MM-YYYY").add(1,"w").format("DD-MM-YYYY")
// console.log(date2)

var op = updateFirebaseDocument("personal_laptop","open_skype",true)
console.log(op)

// var admin = require("firebase-admin");
// var serviceAccount = require("./Keys/auto-bot-3c17c-firebase-adminsdk-rsdhn-19b8c738ab.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();
// var data  = {"trigger_command_config":{"open_b4b_email":"null","open_skype":"start Skype","open_notepad_pp":"null","open_default_browser":"null","open_vs_code":"code .","lock_windows":"null","open_hexa_email":"null"},"device_name":"personal_laptop","app_trigger_config":{"open_b4b_email":false,"open_skype":false,"lock_windows":false,"open_default_browser":false,"open_notepad_pp":false,"open_vs_code":false,"open_hexa_email":false}}
// const res = db.collection('autobot-device-handler').doc('personal_laptop').set(data);