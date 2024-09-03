const express = require('express')
const router = express.Router();
const userModel = require('../models/userModel')

//post method for authenticating on '/authenticate'
router.post('/authenticate', async (req, res, next) => {


    try {
        const { username } = req.body; //req.body contains the username for the verification
        //Check the username existence
        const usernameExist = await userModel.findOne({ username });
        //if username doesn't exist then denied the request
        if (!usernameExist) {
            return res.status(404).json({ error: "Username doesn't exist" });
        }
        else {
            res.status(200).json({ msg: "Username exist" });
            next();
        }


    } catch (error) {
        return res.status(404).json({ error: "Authentication Error" });
    }

}, (req, res) => res.end());


module.exports = router;