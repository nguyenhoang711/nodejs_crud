require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (receiverEmail, subj, text, link) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nguyen Hoang 👻" <project.airportsystem@gmail.com>', // sender address
        to: receiverEmail, // list of receivers
        subject: subj, // Subject line
        text: text, // plain text body
        html: `<a href="${link}" target='_blank'>Click here</a>`, // html body
    });
    
}


module.exports = {
    sendSimpleEmail: sendSimpleEmail
}
