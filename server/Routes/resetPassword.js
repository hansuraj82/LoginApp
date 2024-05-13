const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const verifyUser = require('../controller/verifyUser');

//function for finding username and updating the password
const resetPassword = async (req, res) => {
    try {
        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session Expired" });
        const { username, password } = req.body;
        console.log('usrname is ',username);
        console.log('password is ',password);
        try {
            const usernameExist = await userModel.findOne({username});
            if(!usernameExist) return res.status(404).send({error: 'Username not found'});
            //if usernameExist then hash the password
            const salt = await bcrypt.genSalt(10);
            console.log(salt);
            const hashedPassword = await bcrypt.hash(password,salt);
            console.log(hashedPassword);
            const response = await userModel.findOneAndUpdate({username: usernameExist.username},{password: hashedPassword});
            console.log('res is ',response);
            req.app.locals.resetSession = false; // reset session
            if(response) {
                return res.status(200).send({msg: "Record Updated Successfully....!"});
            }


        } catch (error) {
            console.log(error);
            res.status(500).send({error : "error while updating",error});
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error });
    }


}

//route for reseting the password
router.put('/resetPassword',verifyUser,resetPassword);

module.exports = router;

