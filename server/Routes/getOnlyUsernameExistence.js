const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

//getRote for getting user picture and username for the password validation page
router.get('/user/usernameExistence/:username_from_params', async (req,res)=> {
    const {username_from_params} = req.params;
    try {
        if(!username_from_params) return res.status(501).json({error: "Invalid username"});
        const user = await userModel.findOne({username: username_from_params});
        if(!user) return res.status(404).json({error:"can't find the user in the database"});
        const {username,firstName,profile} = Object.assign({},user.toJSON())
        return res.status(200).json({username,firstName,profile});
    } catch (error) {
        console.log(error)
        return res.status(501).json({error: "can't find the user"})
    }
})

module.exports = router;