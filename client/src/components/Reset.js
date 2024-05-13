import React from "react";
import { useFormik } from 'formik';
import { confirmPasswordValidate } from "../helper/validate";
import { Toaster } from "react-hot-toast";
import '../index.css';
import { Link } from "react-router-dom";




export default function Reset() {

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPass: ''
        },
        validate: confirmPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values)
        }
    })

    return (
        <>
            
            <div className="container-fluid h-100vh">
            <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">
                        <div className="">
                            <h2 className="fw-bold mt-4">Reset</h2>
                        </div>
                        <p className="text-secondary">Enter New Password</p>
                        
                        <div className="d-flex flex-column col-8  my-2">
                            <input  {...formik.getFieldProps('password')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="password*" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input  {...formik.getFieldProps('confirmPass')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="confirm password*" aria-label="Username" aria-describedby="basic-addon1"/>

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