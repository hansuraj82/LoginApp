const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
//This route is for post method on '/register'
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, profile } = req.body;
        const existUsername = await userModel.findOne({ username });
        //check for existing username
        if (existUsername) {
            console.log("Username Exist Please Change The Username");
            res.status(500).json({ error: "Username Exist Please Change The Username" });
        }
        const existEmail = await userModel.findOne({ email });
        //checking for existing email
        if (existEmail) {
            console.log("Email exist Please change the email");
            res.status(500).json({ error: "Email exist Please change the email" });
        }
        //generate salt for hashing the password
        const salt = await bcrypt.genSalt(10);
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, salt);
        //set the plain text password to hashedPassword
        //creating the new model of userModel 
        const newUser = new userModel({
            username,
            //set the plain text password to hashedPassword
            password: hashedPassword,
            profile: profile || '',
            email
        });
        console.log('user model with the given data created and in process of saving....')
        //Saving the new user to the database
        const response = await newUser.save();
        console.log("user saved to the database");
        if (!response) {
            console.log("New User Not Saved........!")
            res.status(500).json({ error: "user Not saved" });
        }
        console.log("User Registered successfully");
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "while saving the person", error });
    }
})

module.exports = router;