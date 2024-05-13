const userModel = require('../models/userModel')


async function verifyUser(req,res,next)  {
    try {
        const { username } =  req.method == 'GET' ? req.query : req.body; //req.body contains the username for the verification
        //Check the username existence
        const usernameExist = await userModel.findOne({ username });
        //if username doesn't exist then denied the request
        if (!usernameExist) {
            console.log("user not found")
            return res.status(404).send({ error: "Username doesn't exist" });
        }
            next();


    } catch (error) {
        console.log('error is ',error);
        return res.status(404).send({ error: "Authentication Error" });
    }
}

module.exports = verifyUser;