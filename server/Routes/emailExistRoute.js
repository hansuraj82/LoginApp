const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');


//checking email existence
router.post('/checkemail', async(req,res) =>  {
    const {email} = req.body;
    const emailExist = await userModel.findOne({email});
    try {
        if(emailExist) {
        return res.status(409).json({msg: "Email Exist Please Change it"});
    }
    else {
        return res.status(200).json({msg: "You can use this email"});
    }

    } catch (error) {
        return res.status(500).json({error});
    }
    
})

module.exports = router;