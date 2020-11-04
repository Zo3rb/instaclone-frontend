import React, { useEffect } from 'react';

import { useHistory, Link } from 'react-router-dom';

const AuthNote = () => {

    // Getting Clone From The History to Redirect The User
    const history = useHistory();

    // Using Life Cycle Method to Redirect after 3 Seconds once ComponentDidMount
    useEffect(() => {
        setTimeout(() => history.push('/'), 3000);
    }, []);

    return (
        <div className="container-fluid row py-5">
            <div className="col-sm-10 offset-sm-1">
                <p className="text-center font-weight-bold text-danger">
                    <i className="fas fa-user-lock fa-5x"></i>
                </p>
                <h1 className="h4 text-center text-primary mt-5">You Need to Be Logged in to Visit This Page</h1>
                <p className="text-muted text-center">You'll Be Redirected in Seconds or You Can Press <Link to="/">HERE</Link></p>
            </div>
        </div>
    );
}

export default AuthNote;
