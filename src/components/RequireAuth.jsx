import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RequireAuth = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            auth
                ? <Component {...props} />
                : <Redirect to="/no-auth" />
        )}
    />
);

export default RequireAuth;