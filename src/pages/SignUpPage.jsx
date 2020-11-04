import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { SignUp } from '../components';

const SignUpPage = () => {
    return (
        <Fragment>
            <h1 className="h3 text-center text-primary mt-5">Sign Up Here</h1>
            <p className="text-center text-muted text-secondary">No Client Side Validation to Demonstrate the Error Handling</p>
            <SignUp />
            <p className="text-muted text-center">Already Have an Account ? You Can <Link to="/login">Login</Link> From Here</p>
        </Fragment>
    );
}

export default SignUpPage;
