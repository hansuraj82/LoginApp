import React from "react";
import { Link } from "react-router-dom";
export default function ServerError() {
    return(
        <>
         <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="text-center">
            <h1 className="display-4">500 - Server Error</h1>
            <p className="lead">We're sorry, but something went wrong on our end.</p>
            <p className="lead">Our team has been notified of the issue. Please try again later.</p>
            <Link className="btn btn-primary col-8" to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}