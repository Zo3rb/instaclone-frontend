import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { Login } from '../components';

const LoginPage = () => {
    return (
        <Fragment>
            <h1 className="h3 text-center text-primary mt-5">Login Here</h1>
            <p className="text-center text-muted text-secondary">No Client Side Validation to Demonstrate the Error Handling</p>
            <Login />
            <p className="text-muted text-center">Don't Have an Account ? You Can <Link to="/reg">Signup</Link> From Here</p>
        </Fragment>
    );
}

export default LoginPage;
