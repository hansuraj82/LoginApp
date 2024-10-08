import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound () {
    return (
        <>
        <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="text-center">
            <h1 className="display-4">404 - Page Not Found</h1>
            <p className="lead">Sorry, the page you are looking for does not exist.</p>
            <Link className="btn btn-primary col-8" to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}