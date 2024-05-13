const express = require('express');
const router = express.Router();

//route for create reset Session
//function for createResetSession
const createResetSession = async(req,res) => {
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;
        res.status(200).send({msg: "Access Granted"});
    }
    res.status(440).send({error: "session Expired"});
}
router.get('/createResetSession',createResetSession);

module.exports = router;