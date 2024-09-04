const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const verifyUser = require('../controller/verifyUser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
const SESSION_TIME = process.env.SESSION_TIME


router.post('/login', verifyUser, async (req, res) => {
    const { username, password } = req.body;
    try {
        const usernameExist = await userModel.findOne({ username });
        if (!usernameExist) return res.status(404).json({ error: "username doesn't exist" });
        //checking password with database and the entered password
        else {
            const passwordCheck = await bcrypt.compare(password, usernameExist.password);
            if (!passwordCheck) return res.status(404).json({ error: "password doesn't match" });
            else {
                const token = jwt.sign({ userId: usernameExist._id, username: usernameExist.username }, JWT_SECRET, { expiresIn: SESSION_TIME });
                res.status(200).json({
                    msg: "LogIn successfull",
                    username: usernameExist.username,
                    token
                })
            }
        }

    } catch (error) {
        return res.status(404).json({ error })
    }
});

module.exports = router;