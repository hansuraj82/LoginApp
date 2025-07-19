// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
const express = require('express')
const cors = require('cors');
// const morgan = require('morgan');
const db = require('./dbConnection');
require('dotenv').config()
const PORT = process.env.PORT || 3001
const app = express();

//Using middlewares
app.use(express.json());
const corsOptions = {
    origin: 'https://login-app-liart.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust the allowed headers if necessary
  };
  
//for development on localhost
// const corsOptions = {
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
//     // allowedHeaders: ['Content-Type', 'Authorization'], // Adjust the allowed headers if necessary
//   };



//Apply the CORS middleware to your Express app
//
app.use(cors(corsOptions));
// app.use(morgan('tiny'));
app.disable('x-powered-by');


const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()} Request Made to : ${req.originalUrl}]`);
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
const checkemail = require('./Routes/emailExistRoute');
const createTodo = require('./Routes/createTodo');
const getUsernameExistenceRoute = require('./Routes/getOnlyUsernameExistence');



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
app.use('/api',checkemail);
app.use('/api',createTodo);
app.use('/api',getUsernameExistenceRoute);


//Starting the server
app.listen(PORT ,()=> {
    console.log(`Server connected on ${PORT}` );
})