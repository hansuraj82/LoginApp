import React, { useState, useEffect } from "react";
import { useAuthStore } from "../helper/store/store";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { verifyOTP, generateOTP } from "../helper/helper";
import '../index.css';



export default function Recovery() {
    const { username } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        generateOTP(username).then((OTP) => {
            if (OTP) return toast.success('OTP has been sent to Your email');
            return toast.error('Problem while generating OTP');
        });
    }, [username]);

    //function on submit button
    async function onSubmit(e) {
        try {
            e.preventDefault();
            let { status } = await verifyOTP({ username, code: OTP });
            if (status === 200) {
                toast.success('verified Successfully!');
                return navigate('/reset');
            }
        } catch (error) {
            return toast.error('Wrong OTP Check Email Again!');
        }


    }

    //handler of resend OTP
    function resendOTP() {
        let sentPromise = generateOTP(username);
        toast.promise(sentPromise, {
            loading: "sending!",
            success: <b>OTP has been sent to your email</b>,
            error: <b>Could Not Send It</b>
        })
    }

    return (
        <>

            <div className="container-fluid h-100vh">
                <Toaster ></Toaster>
                <main className="row h-90vh d-flex justify-content-center align-items-center">
                    <div className="col-sm-12 col-md-8 col-lg-3 full-viewport d-flex flex-column align-items-center justify-content-center  shadow-lg rounded rounded-5">
                        <form onSubmit={onSubmit}>
                            <div >
                                <div className="mb-5">
                                    <h2 className="fw-bold mt-4 d-flex justify-content-center">Recovery</h2>

                                    <p className="text-secondary fs-5 ">Enter OTP to recover password</p>
                                </div>
                                <p className="fs-6">Enter 6 digit OTP sent to email address</p>
                                <div className="d-flex flex-column col-12  my-2 ">
                                    <input onChange={(e) => setOTP(e.target.value)} type="number" className=" my-2 form-control text-center" placeholder="OTP*" aria-describedby="basic-addon1" />
                                    <button className="btn btn-primary" type="submit">Recover</button>
                                </div>

                            </div>

                        </form>
                        <div className="mb-5 pb-5">
                            <p className="text-secondary-emphasis fs-8">can't get OTP? <span onClick={resendOTP} className="text-danger cursor-p link-underline-light fw-bold">Resend OTP</span></p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}