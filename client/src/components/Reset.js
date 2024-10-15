import React from "react";
import { useFormik } from 'formik';
import { confirmPasswordValidate } from "../helper/validate";
import toast, { Toaster } from "react-hot-toast";
import '../index.css';
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../helper/store/store";
import { useNavigate, Navigate } from "react-router-dom";
import  useFetch  from '../hooks/fetchhook';
import Loading from "./Loading";





export default function Reset() {
    document.title = "Login App - Password Reset"
    const { username } = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const [{ isLoading, status, serverError }] = useFetch('createResetSession');
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
            const resetPromise = resetPassword({ username, password: values.password });
            toast.promise(resetPromise, {
                loading: "Updating Password",
                success: <b>Password Updated Successfully</b>,
                error: <b>Could Not Update Password</b>
            })
            if (resetPromise) {
                navigate('/password');
            }
        }
    })
    if (isLoading) return <Loading/>;
    if (serverError) return <serverError/>
    if (status && status !== 200) return <Navigate to={'/'} replace={true}></Navigate>

    return (
        <>

            <div className="container-fluid h-100vh">
                <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="h-60vh col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">

                        <h2 className="fw-bold ">Reset</h2>

                        <p className="text-secondary">Enter New Password</p>

                        <div className="d-flex flex-column col-8  my-2">
                            <input  {...formik.getFieldProps('password')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="password*" aria-describedby="basic-addon1" />
                            <input  {...formik.getFieldProps('confirmPass')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="confirm password*" aria-describedby="basic-addon1" />

                            <button className="btn btn-primary" type="submit">Reset</button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}