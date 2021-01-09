

module.exports.handleGenerateLeaveMailIntent = function (query_text, parameter, intent_name = "generate_leave_email ", session = "null") {
    return new Promise(function (resolve, reject) {

        if ((query_text === undefined) || (parameter === undefined)) {
            console.log("1")
            sendRejectResponse("Params are undefined", reject)
        } else {
            console.log("Query text : ",query_text)
            console.log("Param => ", parameter);
            var mail_to = parameter.send_to_email;
            if (mail_to === "null") {
                console.log("2")
                sendResolveResponse("Okay I will generate and send the email to shoubhik@hexaride.com", resolve)
            } else {
                console.log("3")
                sendResolveResponse("Okay I will generate and send the email to " + parameter.send_to_email, resolve)
            }

        }





    });

    function sendRejectResponse(err_msg, reject) {
        console.log(4)
        var response = {
            "msg": err_msg,
            "meta_data": meta_data,
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

