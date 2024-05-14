const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const verifyUser = require('../controller/verifyUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/login',verifyUser,async(req,res) => {
    const {username,password} = req.body;
    try {
        const usernameExist = await userModel.findOne({username});
        if(!usernameExist) return res.status(404).json({error:"username doesn't exist"});
        //checking password with database and the entered password
        
        const passwordCheck = await bcrypt.compare(password,usernameExist.password);
        console.log('password is ',password);
        console.log("exist pass is ",usernameExist.password);
        console.log(passwordCheck);
        if(!passwordCheck) return res.status(404).json({error: "password doesn't match"});
        const token = jwt.sign({userId:usernameExist._id,username:usernameExist.username},'123456',{expiresIn:"24h"});
        console.log('token is ',token);
        res.status(200).json({
            msg: "LogIn successfull",
            username: usernameExist.username,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({error})
    }
});

module.exports = router;