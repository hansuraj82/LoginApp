const express = require('express');
const router = express.Router();
const otpGenerator = require('otp-generator');
const {localVariable} = require('../jwtAuth');
const verifyUser = require('../controller/verifyUser');
require('dotenv').config()



//function for generating otp for recovery of password
 const generateOTP = async(req,res,next) => {
    req.app.locals.OTP = otpGenerator.generate(process.env.OTP_GENERATE_DIGIT,{lowerCaseAlphabets: false,upperCaseAlphabets: false,specialChars: false});
    res.status(200).json({code: req.app.locals.OTP});
    next()
}

//route for generating otp 
router.get('/generateOTP',verifyUser,localVariable,generateOTP);

module.exports = router;
