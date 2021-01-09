

module.exports.handleGenerateLeaveMailIntent = function (query_text, parameter, intent_name = "generate_leave_email ", session = "null") {
    return new Promise(function (resolve, reject) {

        if ((query_text === undefined) || (parameter === undefined)) {
            sendRejectResponse("Params are undefined", reject)
        } else {
            var mail_to = parameter.send_to_email;
            if (mail_to === "null") {
                sendResolveResponse("Okay I will generate and send the email to shoubhik@hexaride.com")
            } else {
                sendResolveResponse("Okay I will generate and send the email to " + parameter.send_to_email)
            }

        }





    });

    function sendRejectResponse(err_msg, reject) {
        var response = {
            "msg": err_msg,
            "meta_data": meta_data,
            "session": session
        }
        reject(response);
        console.log('Oops, an error occured %s', err_msg);
    }

    function sendResolveResponse(msg, resolve, meta_data = null) {
        var response = {
            "msg": msg,
            "meta_data": meta_data,
            "session": session
        }
        resolve(response);
        return res;
    }
};

