import React from "react";
import { useFormik } from 'formik';
import { confirmPasswordValidate } from "../helper/validate";
import toast, { Toaster } from "react-hot-toast";
import '../index.css';
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../helper/store/store";
import { useNavigate, Navigate } from "react-router-dom";
import  useFetch  from '../hooks/fetchhook';





export default function Reset() {
    const { username } = useAuthStore(state => state.auth);
    console.log('username in reset is ',username);
    const navigate = useNavigate();
    const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession');
    //useFormik hook to validate and get the username
    console.log("isLoading is ",isLoading);
    console.log("serverError ",serverError);
    console.log('apiData is ',apiData);
    console.log('status is reset is ',status);
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
            console.log('reset promis ',resetPromise);
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
    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if (status && status !== 200) return <Navigate to={'/password'} replace={true}></Navigate>

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