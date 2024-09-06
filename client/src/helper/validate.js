import toast from 'react-hot-toast';
import { authenticate } from './helper';
import {checkemail} from './helper';
import {verifyPassOnly} from './helper';



// checking the username existence and navigate to password page after valid username which is in database
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    if(values.username) {
        //check user Existence  
        const auth = await authenticate(values.username);

        //if user Exist in database then status is 200 else status is 404
        if(auth.status !== 200) {
            errors.exist = toast.error("User Not Exist");
        }

    }
    return errors;
}
//validate password
export async function passwordValidate(values,username) {
    const errors = passwordVerify({}, values);
    if(values.password) {
        const data = await verifyPassOnly(username,values.password);
        if(data.status !== 200) {
            errors.exist = toast.error('Password entered is incorrect!');
        }
    }
    return errors;
}

// Verifying username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username Required...!");
    }
    else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username...!");
    }
    return error;
}

//verifying password
const specialCharacters = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/
function passwordVerify(error = {}, values) {
    if (!values.password) {
        error.password = toast.error("Password Required...!");
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("Incorrect Password...!");
    }
    else if (values.password.length < 4) {
        error.password = toast.error("Password must be greater than 4 characters");
    }
    else if (!specialCharacters.test(values.password)) {
        error.password = toast.error("Password must have special characters");
    }
    return error;

}

//password and confirm password in Reset
//confirm password validatation
export async function confirmPasswordValidate(values) {
    const errors = confirmPasswordVerify({}, values);
    return errors;
}

//confirm password verification
function confirmPasswordVerify(error = {}, values) {
    const specialCharacters = /[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/
    if (!values.password || !values.confirmPass) {
        error.exist = toast.error("Please Enter Password")
    }
    else if (values.password !== values.confirmPass) {
        error.exist = toast.error("Password Not Match")
    }
    else if (!specialCharacters.test(values.password)) {
        error.exist = toast.error("Password must have special characters");
    }
    else if (values.password.length < 4) {
        error.exist = toast.error("Password must be greater than 4 characters");
    }
    return error;
}

//registration validation
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values)
    //checking the existence of email in database while registration
    
    const checkemailExist = await checkemail(values.email);
    if(checkemailExist.status !==200 ) {
        errors.exist = toast.error("Email Has Been Already used!"); 
    }

    return errors

}
//email verification
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!")
    }
    else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!");
    }
    else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        error.email = toast.error("Invalid Email address...!");
    }
}

//profileUpdateVerification
export async function profileUpdateVerification(values) {
    const errors = firstnameVerify({}, values);
    lastnameVerify(errors, values);
    emailVerify(errors, values);
    mobileVerify(errors,values);
    addressVerify(errors,values);
    //  //checking the existence of email in database while registration
    //  const checkemailExist = await checkemail(values.email);
    //  if(checkemailExist.status !==200 ) {
    //      errors.exist = toast.error("Email Has Been Already used!"); 
    //  }
    return errors;

}
//first name verification
function firstnameVerify(error = {}, values) {
    if (!values.firstName) {
        error.firstName = toast.error("First Name Required....!");
    }
    else if (values.firstName.length < 2) {
        error.firstName = toast.error("First Name Should Be More Than 2 Words......! ");
    }
    return error;
}
//last name verification
function lastnameVerify(error = {}, values) {
    if (!values.lastName) {
        error.lastName = toast.error("Last Name Required....!");
    }
    else if (values.lastName.length < 2) {
        error.lastName = toast.error("Last Name Should Be More Than 2 Words......! ");
    }
    return error;
}
//Mobile number verification
function mobileVerify(error = {}, values) {
    if (!values.mobile) {
        error.mobile = toast.error("Mobile Number Required.....!");
    }
    else if (!(values.mobile.length === 10)) {
        error.mobile = toast.error("Please Enter a Valid Mobile Number......!")
    }
}
//Address verification
function addressVerify(error = {}, values) {
    if (!values.address) {
        error.address = toast.error("Address Required.....!");
    }
    else if (values.address.length < 2) {
        error.address = toast.error("Please Enter a Valid Adrress......!")
    }
}
