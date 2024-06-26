import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({children}) =>{
    const token = localStorage.getItem('token');
    if(!token) {
        return <Navigate to={'/'} ></Navigate>
    }
        return children;
}