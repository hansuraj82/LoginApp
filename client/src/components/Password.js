import React from "react";
import { useFormik } from 'formik';
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetchhook";
import toast,{ Toaster } from "react-hot-toast";
import '../index.css';
import img from './user-image-dummy.png';
import { Link , useNavigate} from "react-router-dom";
import { useAuthStore } from "../helper/store/store";
import { verifyPassword } from "../helper/helper";
let image_url = img;




export default function Password() {
    const {username} = useAuthStore(state => state.auth);
    const [{isLoading,apiData,serverError}] = useFetch(`user/${username}`);
    const navigate = useNavigate();

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log('username in password ', username);
            console.log('password in password is ', values.password)
            const loginPromise = verifyPassword({username,password: values.password});
            console.log('loginPromise is ',loginPromise);


            toast.promise(loginPromise ,{
                loading: 'Checking...',
                success : <b>Login Successfully...!</b>,
                error : <b>Password Not Match!</b>
              });
              
              loginPromise.then(res => {
                let { token } = res.data;
                console.log('token in password.js is ',token)
                localStorage.setItem('token', token);
                navigate('/profile')
              })
            
        }
    })
    if(isLoading) return <h1 className="text-alert fs-4">isLoading</h1>
    if(serverError) return <h1 className="text-danger fs-4">{serverError.message}</h1>
    return (
        <>
            
            <div className="container-fluid h-100vh">
            <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">
                        <div className="">
                            <h2 className="fw-bold mt-4">Hello {apiData?.firstName || apiData?.username}</h2>
                        </div>
                        <p className="text-secondary">Explore More By Connecting with us </p>
                        <div className="image_space border border-success rounded-circle bg-img">
                            <img className="img-fluid rounded-circle" src={apiData?.profile || image_url}  alt="..."></img>
                        </div>
                        <div className="d-flex flex-column col-6  my-2">
                            <input  {...formik.getFieldProps('password')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1"/>
                            <button className="btn btn-primary" type="submit">Sign in</button>
                        </div>
                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">Forgot Password? <Link className="text-danger cursor-p" to="/recovery">Recover Now</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}