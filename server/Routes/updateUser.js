const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {Auth}  = require('../jwtAuth')


//route for updating the user
router.put('/updateuser',Auth,async(req,res) => {
    try {
        const {userId} = req.user;
        if(userId) {
            const updatedData = req.body;
            //update the data in database
            const response = await userModel.findByIdAndUpdate({_id: userId},updatedData,{
                new: true,
                runValidators: true
            })
            if(response) {
                res.status(200).json({msg: "Record Updated Successfully....!"});
            }
            else {
                res.status(500).json({error: "No Updation"});
            }

        }
        else{
            res.status.json(404).json({error: "User Not Found"});
        }

    } catch (error) {
        res.status(401).json({error})
    }
})

module.exports = router;
