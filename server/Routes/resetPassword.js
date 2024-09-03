const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const verifyUser = require('../controller/verifyUser');


//function for finding username and updating the password
const resetPassword = async (req, res) => {
    try {
        if (!req.app.locals.resetSession) return res.status(404).json({ error: "Session Expired" });
        const { username, password } = req.body;

        try {
            const usernameExist = await userModel.findOne({username});
            if(!usernameExist) return res.status(404).json({error: 'Username not found'});
            //if usernameExist then hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const response = await userModel.findOneAndUpdate({username: usernameExist.username},{password: hashedPassword});

            
            req.app.locals.resetSession = false; // reset session
            if(response) {
                return res.status(200).json({msg: "Record Updated Successfully....!"});
            }


        } catch (error) {
            res.status(500).json({error : "error while updating",error});
        }
        
    } catch (error) {
        res.status(401).json({ error: error });
    }


}

//route for reseting the password
router.put('/resetPassword',verifyUser,resetPassword);

module.exports = router;

