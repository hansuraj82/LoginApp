const express = require('express');
const router = express.Router();

//route for create reset Session
//function for createResetSession
const createResetSession = async(req,res) => {
    if(req.app.locals.resetSession){
        

        res.status(200).json({flag: req.app.locals.resetSession});
    }
    else{res.status(404).json({error: "session Expired"});}
}
router.get('/createResetSession',createResetSession);

module.exports = router;