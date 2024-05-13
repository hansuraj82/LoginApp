const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const {localVariable} = require('../jwtAuth');
const verifyUser = require('../controller/verifyUser');


//function for generating otp for recovery of password
 const generateOTP = async(req,res,next) => {
    req.app.locals.OTP = otpGenerator.generate(6,{lowerCaseAlphabets: false,upperCaseAlphabets: false,specialChars: false});
    console.log('otp generated ',req.app.locals.OTP );
    console.log('otp is ', req.app.locals.OTP)
    res.status(200).send({code: req.app.locals.OTP});
    next()
}

//route for generating otp 
router.get('/generateOTP',verifyUser,localVariable,generateOTP);

module.exports = router;
