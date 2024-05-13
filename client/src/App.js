import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

//Importing all the components
import Username from './components/Username';
import Register from './components/Register';
import Password from './components/Password';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';
import Recovery from './components/Recovery';

//Auth middleware for navigating using token
import { AuthorizeUser } from './helper/auth';


// Route Routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <Password/>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '/*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/recovery',
        element: <Recovery/>
    }




])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}/>
        </main>
    )
};