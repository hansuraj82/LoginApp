// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
const express = require('express')
const cors = require('cors');
// const morgan = require('morgan');
const db = require('./dbConnection');


const app = express();

//Using middlewares
app.use(express.json());
app.use(cors());
// app.use(morgan('tiny'));
app.disable('x-powered-by');

const PORT = 3001;
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()} Request Made to : ${req.originalUrl}]`)
    next();
}
app.use(logRequest);
//HTTPS get request
app.get('/',  (req,res) => {
    res.status(200).json({"Request":"Home Get Request"});
});
// Routes for userRegistration
const userRoutes = require('./Routes/userRegisterRoutes');
const usernameVerify = require('./Routes/usernameVerify');
const getUserRoute = require('./Routes/getUser');
const loginRoute = require('./Routes/loginRoute');
const updateUser = require('./Routes/updateUser');
const generateOTP = require('./Routes/generateOtpRoute');
const verifyOTP = require('./Routes/verifyOtpRoute');
const createResetSession = require('./Routes/createResetSession');
const resetPassword = require('./Routes/resetPassword')
const registerMail = require('./Routes/registerMail');
app.use('/api',userRoutes);
app.use('/api',usernameVerify);
app.use('/api',getUserRoute);
app.use('/api',loginRoute);
app.use('/api',updateUser);
app.use('/api',generateOTP);
app.use('/api',verifyOTP);
app.use('/api',createResetSession);
app.use('/api',resetPassword);
app.use('/api',registerMail);

//Starting the server
app.listen(PORT ,()=> {
    console.log(`Server connected on ${PORT}` );
})