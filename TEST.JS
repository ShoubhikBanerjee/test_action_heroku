// const { sendEmail } = require("./Utils/SendEmail");

// sendEmail("shoubhik@hexaride.com","Test", "test")


var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();

var date1 = "18-01-2021"
var date2= moment(date1, "DD-MM-YYYY").add(1,"w").format("DD-MM-YYYY")
console.log(date2)
