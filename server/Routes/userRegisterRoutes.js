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
            res.status(500).json({ error: "Username Exist Please Change The Username" });
        }
        const existEmail = await userModel.findOne({ email });
        //checking for existing email
        if (existEmail) {
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
        //Saving the new user to the database
        const response = await newUser.save();

        if (!response) {
            res.status(500).json({ error: "user Not saved" });
        }
        else {
            res.status(200).json(response);
        }



    } catch (error) {
        return res.status(500).send({ Error: "while saving the person", error });
    }
})

module.exports = router;