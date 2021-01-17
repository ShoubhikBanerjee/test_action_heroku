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
                var device_action = parameter.device_actions;
                var apps = parameter.apps;
                var devices = parameter.devices;
                var custom_directory = parameter.custom_directories;
                if (devices === "PersonalLaptop") {
                    var all_okay = true;
                    if ((apps === undefined) || (apps === null)) {
                        if (device_action === "close") {
                            updateFirebaseDocument("personal_laptop", "lock_windows", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "lock_windows", false, custom_directory)
                        }

                    }
                    else if (apps === "VSCode") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "vs_code", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "vs_code", false, custom_directory)
                        }

                    } else if (apps === "Skype") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "skype", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "skype", false, custom_directory)
                        }
                    } else if (apps === "NotepadPP") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "notepad_pp", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "notepad_pp", false, custom_directory)
                        }
                    } else if (apps === "Browser") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "default_browser", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "default_browser", false, custom_directory)
                        }
                    } else if (apps === "HexaMail") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "hexa_email", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "hexa_email", false, custom_directory)
                        }
                    } else if (apps === "B4BMail") {
                        if (device_action === "start") {
                            updateFirebaseDocument("personal_laptop", "b4b_email", true, custom_directory)
                        } else {
                            updateFirebaseDocument("personal_laptop", "b4b_email", false, custom_directory)
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