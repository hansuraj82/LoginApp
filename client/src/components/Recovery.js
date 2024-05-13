import React, { useState,useEffect } from "react";
import { useFormik } from 'formik';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../helper/store/store";
import '../index.css';

const {username} = useAuthStore(state => state.auth);
const [OTP, setOTP] = useState(); 

useEffect(()=> {

},[username]);

export default function Recovery() {

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            Username: '',
        },
        
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
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center  shadow-lg rounded rounded-5">
                        <div className="mb-5">
                            <h2 className="fw-bold mt-4 d-flex justify-content-center">Recovery</h2>

                            <p className="text-secondary fs-5 ">Enter OTP to recover password</p>
                        </div>
                        <p className="fs-6">Enter 6 digit OTP sent to email address</p>
                        <div className="d-flex flex-column col-8  my-2">
                            <input  onChange={(e) => setOTP(e.target.value)} type="number" className=" my-2 form-control" placeholder="OTP*" aria-describedby="basic-addon1" />
                            <button className="btn btn-primary" type="submit">Send OTP</button>
                        </div>
                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">can't get OTP? <span className="text-danger cursor-p link-underline-light fw-bold">Resend OTP</span></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}