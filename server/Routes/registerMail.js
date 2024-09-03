const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config()
const SERVICE_TYPE = process.env.SERVICE_TYPE

// This section is for sending mail to the user on signup and forgot password
const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: SERVICE_TYPE,
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      // user: "lucas.kris@ethereal.email",
      // pass: "yZxckVVHjJ7Z8UQh6x",
      user: process.env.SERVICE_TYPE_MAIL,
      pass: process.env.SERVICE_TYPE_MAIL_PASSWORD
    },
  });
  
  let MaiilGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "LoginApp",
        link: 'https://LoginApp.com'
    }
  });

  //function for mailing the information
  const registerMail = async(req,res) => {
    const {username,userEmail,text,subject} = req.body;

    //body of the email
    var email = {
        body: {
            name: username,
            intro: text || "welcome to the LoginApp! we are very excited to have you on board",
            outro: "Need help or have any questions? just reply to this email we would love to help.........!"
        }
    }
    var emailbody = MaiilGenerator.generate(email);
    let message = {
        // from: "lucas.kris@ethereal.email",
        from: process.env.SERVICE_TYPE_MAIL,
        to: userEmail,
        subject: subject || "SignUP Successfully",
        html: emailbody
    }
    //sending mail
    transporter.sendMail(message)
    .then(() => {
        return res.status(200).json({msg: "You Should receive an email from us "})
        
    })
    .catch(error => res.status(500).json({error}));
  }






//route for sending mail 
router.post('/registerMail',registerMail);

module.exports = router;