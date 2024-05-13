const express = require('express')
const router = express.Router();
const userModel = require('../models/userModel')

//post method for authenticating on '/authenticate'
router.post('/authenticate', async (req, res, next) => {


    try {
        console.log('checking username');
        const { username } =  req.body; //req.body contains the username for the verification
        console.log("username is",username);
        //Check the username existence
        const usernameExist = await userModel.findOne({ username });
        console.log("userDetails are ",usernameExist);
        //if username doesn't exist then denied the request
        if (!usernameExist) {
            console.log("user not found")
            return res.status(404).send({ error: "Username doesn't exist" });
        }
            console.log("user exist");
            res.status(200).send({msg: "Username exist"});
            next();


    } catch (error) {
        console.log('error is ',error);
        return res.status(404).send({ error: "Authentication Error" });
    }

}, (req,res) => res.end());


module.exports = router;