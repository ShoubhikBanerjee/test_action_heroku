
// var moment = require('moment'); // require
var moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
const LeaveEmailTemplate = require('../Configs/LeaveEmailTemplates.json');
const { chooseTemplateViaLength } = require('../Utils/ChooseTemplateIndex');
const { sendEmail } = require('../Utils/SendEmail');

module.exports.handleGenerateLeaveMailIntent = function (query_text, parameter, intent_name = "generate_leave_email ", session = "null") {
    return new Promise(function (resolve, reject) {

        try {
            if ((query_text === undefined) || (parameter === undefined)) {
                console.log("3")
                sendRejectResponse("Params are undefined", reject)
            } else {
                
                console.log("Query text : ", query_text)
                console.log("Param => ", parameter);
                var from_date = parameter.from_date;
                var to_date = parameter.to_date;
                var leave_reason = parameter.leave_reason;
                var duration = parameter.duration;
                var mail_to = parameter.send_to_email;
                console.log("Duration =>", duration)
                console.log("type of duration : ", typeof (duration))
                var formatted_from_date = moment(from_date).format("DD-MM-YYYY");
                var to_email_id = null;
                if (mail_to === "null") {
                    console.log("4")
                    to_email_id = "shoubhik@hexaride.com";
                } else {
                    console.log("5")
                    to_email_id = mail_to;
                }
                var formatted_to_date = null;
                var duration_string = "";
                if (to_date === "") {
                    if (duration === "") {

                    } else {
                        var amount = duration.amount;
                        var unit = duration.unit;
                        console.log("Duration unit : " + unit.toString())
                        if ((unit === "wk") || (unit === "mo") || (unit === "day")) {
                            if (unit === "wk") {
                                console.log("In WK : ", typeof (formatted_from_date))
                                console.log("Formatted from date : ", formatted_from_date)

                                formatted_to_date = moment(formatted_from_date, "DD-MM-YYYY").add(amount, 'weeks').format("DD-MM-YYYY")
                            } else if (unit === "mo") {
                                console.log("In WK")
                                formatted_to_date = moment(formatted_from_date, "DD-MM-YYYY").add(amount, 'months').format("DD-MM-YYYY")
                            } else if (unit === "day") {
                                console.log("In WK")
                                formatted_to_date = moment(formatted_from_date, "DD-MM-YYYY").add(amount, 'days').format("DD-MM-YYYY")
                            }
                        } else {
                            sendRejectResponse("Sorry I couldnot get your duration, please try again!", reject)
                        }
                    }
                } else {
                    formatted_to_date = moment(to_date).format("DD-MM-YYYY");
                }
                sendResolveResponse("Okay I will generate and send the email to " + to_email_id, resolve)
                console.log("6")
                console.log("FOrmated to date => ", formatted_to_date)
                console.log("Type FOrmated to date => ", typeof (formatted_to_date))
                if ((formatted_to_date === null)||(formatted_to_date === formatted_from_date)){
                    console.log("In Null 1")
                    duration_string = "for " + formatted_from_date.toString();
                } else {
                    console.log("In Not Null 1")
                    duration_string = "from " + formatted_from_date.toString() + " to " + formatted_to_date.toString();
                }
                console.log("7")
                var selected_template_idx = chooseTemplateViaLength(LeaveEmailTemplate.length, min = 0, retun_count = 1)[0];
                var selected_template_text = LeaveEmailTemplate[selected_template_idx].template;
                selected_template_text = selected_template_text.replace("$date", duration_string);
                selected_template_text = selected_template_text.replace("$leave_reson", leave_reason)
                console.log("8")
                var subject = "Demo Leave application " + duration_string + " "+leave_reason;
                sendEmail(to_email_id, subject, selected_template_text, html_content = null)
                console.log("9")
                // sendResolveResponse("Okay I will generate and send the email to " + to_email_id, resolve)
                console.log("10")
            }

        } catch (e) {
            console.log("Error : ", e)
        }









    });

    function sendRejectResponse(err_msg, reject) {
        console.log(4)
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
};

