const nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

module.exports.sendEmail = function (to_email, subject, body, html_content = null) {
    console.log("-------------------------- Sending Mail-----------------------------")
    console.log("To Mail => ", to_email);
    console.log("Subject => ", subject);
    console.log("Body => ", body)
    console.log("Html Content => ", html_content)
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "smtp-relay.gmail.com",
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: "autotechbots@gmail.com",
                pass: "get2work"
            })
        }
    });
    var mailOptions = {
        from: "Autobot Buddy!",
        to: to_email,
        subject: subject,
        text: body
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            console.log("------------------------------- Mail Send End : Error-------------------------")
        } else {
            console.log("Mail send successfully")
            console.log("------------------------------- Mail Send End: Success-------------------------")
        }
    });
};



