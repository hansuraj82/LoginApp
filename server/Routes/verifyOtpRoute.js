const express = require('express');
const router = express.Router();
const verifyUser = require('../controller/verifyUser');
//function for verify the otp
const verifyOTP = async (req, res) => {
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; //reset the otp value
        req.app.locals.resetSession = true; //start session for reset password
        console.log('setting the true on reqapploc',  req.app.locals.resetSession);
        return res.status(200).json({msg: "OTP verified Successfully"});
    }
    return res.status(400).json({error: "Invalid OTP"});
}

//route for verify the otp entered by the user
router.get('/verifyOTP', verifyUser, verifyOTP);

module.exports = router;