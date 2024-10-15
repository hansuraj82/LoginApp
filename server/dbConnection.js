const mongoose = require('mongoose');
require('dotenv').config()

//MongoDB LOCAL url
// const MONGODB_URL_LOCAL = process.env.MONGODB_URL_LOCAL;


//MONGODB URL ONLINE
const MONGODB_URL = process.env.MONGODB_URL

//MongoDB connection with mongoose
mongoose.connect(MONGODB_URL);

//Mongoose maintains a default connection object representing the MONGODB connection
const db = mongoose.connection;

//Get the default connection
//Define the Event Listener for the db connection
db.on('connected',()=> {
    console.log("MongoDB connected.......");
});

db.on('disconnected',() => {
    console.log("MongoDB Disconnected.....");
})

db.on('error', ()=> {
    console.log("MongoDB connection Error");
})

module.exports = db;