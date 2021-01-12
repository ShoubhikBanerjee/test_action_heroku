const e = require("express");
const { updateFirebaseDocument } = require("../FirebaseHandler");


module.exports.handleControlDeviceIntent = function (query_text, parameter, session = "null") {
    return new Promise(function (resolve, reject) {
        try {
            if ((query_text === undefined) || (parameter === undefined)) {
                console.log("3")
                sendRejectResponse("Params are undefined", reject)
            } else {

                console.log("Query text : ", query_text)
                console.log("Param => ", parameter);
                var device_action = parameter.device_action;
                var apps = parameter.apps;
                var devices = parameter.devices;
                if (devices === "PersonalLaptop") {
                    var all_okay = true;
                    if (apps === "VSCode") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_vs_code", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_vs_code", false)
                        }

                    } else if (apps === "Skype") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_skype", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_skype", false)
                        }
                    } else if (apps === "NotepadPP") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_notepad_pp", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_notepad_pp", false)
                        }
                    } else if (apps === "Browser") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_default_browser", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_default_browser", false)
                        }
                    } else if (apps === "HexaMail") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_hexa_email", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_hexa_email", false)
                        }
                    } else if (apps === "B4BMail") {
                        if (device_action === "Start") {
                            updateFirebaseDocument("personal_laptop", "open_b4b_email", true)
                        } else {
                            updateFirebaseDocument("personal_laptop", "open_b4b_email", false)
                        }
                    } else {
                        all_okay = false;
                    }

                    if (all_okay) {
                        sendResolveResponse("Okay I will " + device_action + "  " + apps + " on your " + devices, resolve)
                    } else {
                        sendRejectResponse("Sorry ! The app " + apps + " is not recognized !", reject)
                    }
                } else {
                    sendRejectResponse("Sorry ! The device " + devices + " is not recognized !", reject)
                }


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

}