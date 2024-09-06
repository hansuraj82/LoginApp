import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Importing all the components
import Username from './components/Username';
import Register from './components/Register';
import Password from './components/Password';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';
import Recovery from './components/Recovery';
import ErrorBoundary from './components/ErrorBoundary';
import ServerError from './components/ServerError';

//Auth middleware for navigating using token
import { AuthorizeUser } from './helper/auth';


// Route Routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <ErrorBoundary><Username/></ErrorBoundary>
    },
    {
        path: '/register',
        element: <ErrorBoundary><Register/></ErrorBoundary>
    },
    {
        path: '/password',
        element: <ErrorBoundary><Password /></ErrorBoundary> 
    },
    {
        path: '/profile',
        element: <ErrorBoundary><AuthorizeUser><Profile /></AuthorizeUser></ErrorBoundary>
    },
    {
        path: '/reset',
        element: <ErrorBoundary><Reset/></ErrorBoundary>
    },
    {
        path: '/*',
        element: <PageNotFound></PageNotFound>
    },

    {
        path: '/recovery',
        element: <ErrorBoundary><Recovery /></ErrorBoundary>
    },
    {
        path: '/serverError',
        element: <ServerError/>
    }



])

export default function App() {
    return (
        <main>
            <ErrorBoundary>
            <RouterProvider router={router} />
            </ErrorBoundary>
        </main>
    )
};