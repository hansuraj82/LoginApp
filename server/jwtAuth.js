const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
  const Auth = async(req,res,next) =>{
    try {
        //access authorize header to validate the request
        const token = req.headers.authorization.split(' ')[1];
        //retrieve the username for the logged in user
        const decodedToken = jwt.verify(token,JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({error: "Authentication failed"});
    }
}

const localVariable = async(req,res,next) => {
     req.app.locals = {
        OTP: 123,
        resetSession: false
     }
     next();
}

module.exports = {Auth,localVariable};