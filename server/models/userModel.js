const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Defining the user schema with the help of mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    profile: {
        type: String
    }
});


//Hashing the password with the help of bcrypt
//Here pre is a middleware
// userSchema.pre('save', async (next) => {
//     const userValue = this;
//     //Hash the password if the password is new or modified 
//     // if (!(user.isModified('password'))) return next();
//     if(!userValue.password){
//         throw new Error("uservalue.password is null")
//     }

//     try {
//         //generate salt for hashing the password
//         const salt = await bcrypt.genSalt(10);
//         // console.log("salt generated succesfully");
//         if(!salt) {
//             throw new Error("Salt generation failed")
//         }
//         if(!this.password) {
//             throw new Error("password is missing");
//         }
//         //Hahsing the password
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         // console.log("hashed password success")
//         //assigning the hashedPassword instead of plain text while saving the data
//         userValue.password = hashedPassword;
//         // console.log("hashed the plain password");
//         next();
//     } catch (error) {
//         // console.log("error while saving the data");
//         return next(error);
//     }

// })  

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;