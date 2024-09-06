import React, { useState } from "react";
import useFetch from "../hooks/fetchhook";
import { useFormik } from 'formik';
import { profileUpdateVerification } from "../helper/validate";
import { updateUser } from "../helper/helper";
import convertToBase64 from "../helper/convert";
import toast,{ Toaster } from "react-hot-toast";
import '../index.css';
import img from './userImage/user.png';
import {useNavigate} from "react-router-dom";
import Loading from "./Loading";
import ServerError from "./ServerError";
let image_url = img;




export default function Profile() {
    document.title = "Login App - User Profile"
    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
    const navigate = useNavigate()

    //useFormik hook to validate and get the username
    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            email: apiData?.email || '',
            mobile: apiData?.mobile || '',
            address: apiData?.address ||''
        },
        enableReinitialize: true,
        validate: profileUpdateVerification,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = Object.assign(values, { profile: file || apiData?.profile || '' });
            const updatePromise = updateUser(values);
            toast.promise(updatePromise, {
                loading: 'Updating.....',
                success: <b>Updated Successfully</b>,
                error: <b>Could Not Update</b>
            })
        }
    })
    //formik doesn't support file upload so we need to create this handler//
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);

    }

    //By clicking logout button remove the token from the localstorage
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    if(isLoading) return <Loading/>
    if(serverError) return <ServerError/>
    return (
        <>

            <div className="container-fluid h-100vh ">
                <Toaster ></Toaster>
                <form className="row h-90vh d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center shadow-lg rounded rounded-5">
                        <div className="">
                            <h2 className="fw-bold mt-5">Profile</h2>
                        </div>
                        <p className="text-secondary">You Can Update Your Details!</p>
                        <div className="image_space border border-success rounded-circle bg-img">
                            <label htmlFor="profile">
                                <img src={file || apiData?.profile || image_url} className="img-fluid " alt="..."></img>
                            </label>
                            <input type="file" onChange={onUpload} id="profile" name="profile" />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <input  {...formik.getFieldProps('firstName')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="First Name*" aria-describedby="basic-addon1" />
                                </div>
                                <div className="col-6 ">
                                    <input  {...formik.getFieldProps('lastName')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="Last Name*" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <input  {...formik.getFieldProps('email')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="email*" aria-describedby="basic-addon1" />
                                </div>
                                <div className="col-6">
                                    <input  {...formik.getFieldProps('mobile')} onChange={formik.handleChange} type="text" maxLength="10" className=" my-2 form-control" placeholder="Mobile No*"  aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-11">
                            <input  {...formik.getFieldProps('address')} onChange={formik.handleChange} type="text" className=" my-2 form-control" placeholder="Address*" aria-describedby="basic-addon1" />
                        </div>
                        <button className="col-11 btn btn-primary " type="submit">Update</button>

                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">Already Updated? <span className="text-danger cursor-p link-underline-light" onClick={userLogout}>Log Out</span></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}