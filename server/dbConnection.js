const mongoose = require('mongoose');

//MongoDB url
const mongoURL = 'mongodb://localhost:27017/loginApp';

//MongoDB connection with mongoose
mongoose.connect(mongoURL);

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