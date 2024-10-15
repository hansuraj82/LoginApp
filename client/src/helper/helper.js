// import express from 'express'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

//FUNCTION FOR FINDING USERNAME by token
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject('can not find token');
    let decode = jwtDecode(token);
    return decode;
}

//function for checking the exist username 
export async function checkemail(email) {
    try {
        const checkemailExist = await axios.post(`/api/checkemail`, { email });
        return checkemailExist;
    } catch (error) {
        return error;
    }
}

// function for regestring the user
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);
        let { username, email } = credentials;
        if (status === 200) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
        }
        return Promise.resolve(msg);
    } catch (error) {
        //return Promise.reject(error);
        window.location.href = '/serverError'
    }
}


//function for checking username Existence and navigate to the password page
export async function authenticate(username) {
    try {
        const auth = await axios.post(`/api/authenticate`, { username });
        return auth;
    } catch (error) {
        return error;

    }
}


//function for checking password existence for the exist username to navigate to the profile page;
export async function verifyPassword({ username, password }) {

    try {
        if (username) {
            const data = await axios.post('/api/login', { username, password });
            return Promise.resolve(data);
        }
    } catch (error) {
        return Promise.reject({ error: "Password does not match" });
    }
}

//function for checking password for toast error with the status by loginRoute
export async function verifyPassOnly(username, password) {
    try {
        if (username) {
            const data = await axios.post(`/api/login`, { username, password });

            return data;
        }
    } catch (error) {
        return error;
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
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "password does not match" };
    }
}

//function for generate otp
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });
        //send the mail with otp
        if (status === 200) {
            const { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. verify and Recover Your Password `;
            await axios.post(`/api/registerMail`, { username, userEmail: email, text, subject: "password Recovery Password" })
        }
        return Promise.resolve(code);


    } catch (error) {
        return Promise.reject({ error });
    }
}

//function for verify OTP 
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get(`/api/verifyOTP`, { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error });
    }
}

//function for reset Password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}


//function for createTodo
export async function createTodo({ title, subtodos }) {
    try {
        const token = localStorage.getItem('token')
        // const {userId} = await getUsername()
        const data = await axios.post('/api/todo', { title, subtodos }, { headers: { "Authorization": `Bearer ${token}` } })
        return data;
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function ShowUserTodo() {
    try {
        const token = localStorage.getItem('token');
        const todoData = await axios.get('api/todo', { headers: { "Authorization": `Bearer ${token}` } });
        console.log('in function data is', todoData)
        return todoData;
    } catch (error) {
        return Promise.reject({ error });
    }
}
export async function deleteTodo(todoId) {
    try {
        const token = localStorage.getItem('token');
        const deletedTodo = await axios.delete(`/api/todo/${todoId}`, { headers: { "Authorization": `Bearer ${token}` } })
        return deletedTodo;
    } catch (error) {
        return Promise.reject({ error });
    }
}


export async function deleteSubTodo(subTodoId) {
    try {
        const token = localStorage.getItem('token');
        const deletedSubTodo = await axios.delete(`/api/todo/subtodo/${subTodoId}`, { headers: { "Authorization": `Bearer ${token}` } })
        return deletedSubTodo;
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function isCompletedTodo(TodoId, isCompleted) {
    try {
        const token = localStorage.getItem('token');
        if (isCompleted) {
            isCompleted = false;
        }
        else {
            isCompleted = true;
        }
        const completedTodo = await axios.put(`/api/todo/title/${TodoId}`,{complete:isCompleted}, { headers: { "Authorization": `Bearer ${token}` } })
        return completedTodo;
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function isCompletedSubTodo(subTodoId, isCompleted) {
    try {
        const token = localStorage.getItem('token');
        if (isCompleted) {
            isCompleted = false;
        }
        else {
            isCompleted = true;
        }
        const completedTodo = await axios.put(`/api/todo/subTodo/${subTodoId}`,{isCompleted:isCompleted}, { headers: { "Authorization": `Bearer ${token}` } })
        return completedTodo;
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function addSubTodo(todoId,content) {
    try {
        const token = localStorage.getItem('token');
        console.log('token is ',token);
        console.log('todoId is ',todoId);
        console.log('content is',content);
        const todoData = await axios.put(`api/todo/addSubTodo/${todoId}`,{content}, { headers: { "Authorization": `Bearer ${token}` } });
        console.log('todoData in axios  is', todoData);
        return todoData;
    } catch (error) {
        return Promise.reject({ error });
    }
}

export async function changeTodoTitle(TodoId, title) {
    try {
        const token = localStorage.getItem('token');
        const changedTodo = await axios.put(`/api/todo/title/${TodoId}`,{title:title}, { headers: { "Authorization": `Bearer ${token}` } })
        return changedTodo;
    } catch (error) {
        return Promise.reject({ error });
    }
}


//formatting the date and time of mongoDB createAt time
export function formatDateAndTime(isoDate) {
    const date = new Date(isoDate);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year

    // Get hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format: dd-mm-yy and hh:mm:ss
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
}
