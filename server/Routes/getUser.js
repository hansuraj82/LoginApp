const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

//getRote for getting user picture and username for the password validation page
router.get('/user/:username', async (req,res)=> {
    const {username} = req.params;
    try {
        if(!username) return res.status(501).json({error: "Invalid username"});
        const user = await userModel.findOne({username});
        if(!user) return res.status(404).json({error:"can't find the user in the database"});
        const {password,_id,createdAt,updatedAt,...rest} = Object.assign({},user.toJSON())
        return res.status(200).json(rest);//rest is returned because i don;t want to rend the confidential data with the rest data of a user
    } catch (error) {
        console.log(error)
        return res.status(501).json({error: "can't find the user"})
    }
})

module.exports = router;