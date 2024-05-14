import React from "react";
import { useFormik } from 'formik';
import { usernameValidate } from "../helper/validate";
import { Toaster } from "react-hot-toast";
import '../index.css';
import img from './user-image-dummy.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../helper/store/store";
let image_url = img;




export default function Username() {
    //useNavigate hook to navigate to different page after authentication
    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);
    console.log('setUsername id=s' ,setUsername);

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setUsername(values.username);
            navigate('/password');
        }
    })

    return (
        <>

            <div className="container-fluid h-100vh">
                <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">
                        <div className="">
                            <h2 className="fw-bold mt-4">Hello Again!</h2>
                        </div>
                        <p className="text-secondary">Explore More By Connecting with us </p>
                        <div className="image_space border border-success rounded-circle bg-img">
                            <img src={image_url} className="img-fluid rounded" alt="..."></img>
                        </div>
                        <div className="d-flex flex-column col-8  my-2">
                            <input  {...formik.getFieldProps('username')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            <button className="btn btn-primary " type="submit">Let's Go</button>
                        </div>
                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">Not a Member? <Link className="text-danger cursor-p link-underline-light" to="/register">Register Now</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}