// import express from 'express'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
axios.defaults.baseURL = "http://localhost:3001";

//FUNCTION FOR FINDING USERNAME by token
export async function getUsername() {
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject('can not find token');
    let decode = jwtDecode(token);
    return decode;
}

// function for regestring the user
export async function registerUser(credentials) {
    try {
        const { data: { msg },status } = await axios.post(`/api/register`, credentials);
        let {username,email} = credentials;
        console.log("API connected successfully");
        if(status === 200) {
            await axios.post('/api/registerMail',{username,userEmail:email,text:msg});
        }
        return Promise.resolve(msg);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}


//function for checking username Existence and navigate to the password page
export async function authenticate(username) {
    try {
        const auth = await axios.post(`/api/authenticate`, { username });
        return auth;
    } catch (error) {
        console.log("error while authenticate", error)
        return error;

    }
}


//function for checking password existence for the exist username to navigate to the profile page;
export async function verifyPassword({ username, password }) {

    try {
        if (username) {
            console.log('username in api post is ', username);
            console.log('username in api post is ', password);
            const data = await axios.post('/api/login', { username, password });
            console.log('data for finding token is ', data);
            return Promise.resolve(data);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: "Password does not match" });
    }
}
//function for updating the userDetails
export async function updateUser(response) {

    try {
        const token = localStorage.getItem('token');
        const data = await axios.put('api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "could not update Profile" })
    }
}

//function for getuser
export async function getUser({username}) {
    try{
        const {data} = await axios.get(`/api/user/${username}`);
        return {data};
    } catch(error) {
        return {error: "password does not match"};
    }
}

//function for generate otp
export async function generateOTP(username) {
    try {
        const {data:{code},status } = await axios.get('/api/generateOTP',{params: {username}});
        //send the mail with otp
        if(status === 200) {
            const {data: {email}} = await getUser({username});
            console.log(code);
            let text = `Your Password Recovery OTP is ${code}. verify and Recover Your Password `;
            await axios.post(`/api/registerMail`,{username,userEmail: email,text,subject: "password Recovery Password"})
        }
        return Promise.resolve(code);


    } catch (error) {
        return Promise.reject({error});
    }
}

//function for verify OTP 
export async function verifyOTP({username,code}) {
    try {
        const {data, status} = await axios.get(`/api/verifyOTP`,{params: {username,code}});
        return {data,status};
    } catch (error) {
        return Promise.reject({error});
    }
} 

//function for reset Password
export async function resetPassword({username,password}) {
    try {
        const {data,status} = await axios.put('/api/resetPassword',{username,password});
        return Promise.resolve({data,status});
    } catch (error) {
        return Promise.reject({error});
    }
}