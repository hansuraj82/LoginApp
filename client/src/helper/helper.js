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
        const { data: { msg } } = await axios.post(`/api/register`, credentials);
        console.log("API connected successfully");
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

//function for generate otp
export async function generateOTP(username) {
    try {
        
    } catch (error) {
        
    }
}