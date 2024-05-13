const jwt = require('jsonwebtoken');

  const Auth = async(req,res,next) =>{
    try {
        //access authorize header to validate the request
        const token = req.headers.authorization.split(' ')[1];
        //retrieve the username for the logged in user
        const decodedToken = jwt.verify(token,'123456');
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({error: "Authentication failed"});
    }
}

const localVariable = async(req,res,next) => {
     console.log('comming to loc');
     console.log(' reqis ',req.app.locals);
     req.app.locals = {
        OTP: 123,
        resetSession: false
     }
      console.log(' reqis ',req.app.locals.OTP);
    console.log('going from loc');
     next();
}

module.exports = {Auth,localVariable};