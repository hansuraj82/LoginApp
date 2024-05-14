const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

// This section is for sending mail to the user on signup and forgot password
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "lucas.kris@ethereal.email",
      pass: "yZxckVVHjJ7Z8UQh6x",
    },
  });
  
  let MaiilGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
  });

  //function for mailing the information
  const registerMail = async(req,res) => {
    const {username,userEmail,text,subject} = req.body;

    //body of the email
    var email = {
        body: {
            name: username,
            intro: text || "welcome to the Profiler! we are very excited to have you on board",
            outro: "Need help or have any questions? just reply to this email we would love to help.........!"
        }
    }
    var emailbody = MaiilGenerator.generate(email);
    let message = {
        from: "lucas.kris@ethereal.email",
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