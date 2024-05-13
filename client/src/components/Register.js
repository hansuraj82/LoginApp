import React, { useState } from "react";
import {registerUser} from '../helper/helper';
import { useFormik } from 'formik';
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import toast,{ Toaster } from "react-hot-toast";
import '../index.css';
import img from './user-image-dummy.png';
import { Link,useNavigate } from "react-router-dom";
let image_url = img;





export default function Register() {
    const navigate = useNavigate();
    const [file,setFile] = useState()

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            email: '',
            Username: '',
            password: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = Object.assign(values,{profile: file || ''})
            // console.log(values)
            let registerPromise = registerUser(values);
            toast.promise(registerPromise,{
                loading: 'creating....',
                success: <b>Registered Successfully...!</b>,
                error: <b>Could Not Register</b>
            });
            registerPromise.then(function(){ navigate('/')});
        }
    });
    //formik doesn't support file upload so we need to create this handler//
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);

    }

    return (
        <>
            
            <div className="container-fluid h-100vh">
            <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">
                        <div className="">
                            <h2 className="fw-bold mt-5">Register</h2>
                        </div>
                        <p className="text-secondary">Happy to join you!</p>
                        <div className="image_space border border-success rounded-circle bg-img">
                            <label htmlFor="profile">
                            <img src={file || image_url} className="img-fluid " alt="..."></img>
                            </label>
                            <input type="file" onChange={onUpload} id="profile" name="profile" />
                        </div>
                        <div className="d-flex flex-column col-8  my-2">
                            <input  {...formik.getFieldProps('email')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="email*"  aria-describedby="basic-addon1"/>
                            <input  {...formik.getFieldProps('username')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="Username*"  aria-describedby="basic-addon1"/>
                            <input  {...formik.getFieldProps('password')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="Password*"  aria-describedby="basic-addon1"/>


                            <button className="btn btn-primary" type="submit">Register</button>
                        </div>
                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">Already Registered? <Link className="text-danger cursor-p link-underline-light" to="/">Login Now</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}