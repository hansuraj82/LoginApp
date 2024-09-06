import React from "react";
import '../index.css';

export default function Loading() {
    return (
        <>
            <div className="container-fluid h-100vh d-flex justify-content-center align-items-center">
                <div className="spinner"></div>
            </div>
        </>
    )
}
