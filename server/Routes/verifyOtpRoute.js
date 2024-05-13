const express = require('express');
const router = express.Router();
const verifyUser = require('../controller/verifyUser');
const {localVariable} = require('../jwtAuth');
//function for verify the otp
const verifyOTP = async (req, res) => {
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; //reset the otp value
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(200).send({msg: "OTP verified Successfully"});
    }
    return res.status(400).send({error: "Invalid OTP"});
}

//route for verify the otp entered by the user
router.get('/verifyOTP', verifyUser, verifyOTP);

module.exports = router;