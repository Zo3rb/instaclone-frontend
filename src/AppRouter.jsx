import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomePage, LoginPage, ProfilePage, SignUpPage, PostPage, UserPage } from './pages';
import { RequireAuth, AuthNote } from './components';

const AppRouter = props => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reg" component={SignUpPage} />
            <Route exact path="/login" component={LoginPage} />
            <RequireAuth exact path="/profile" component={ProfilePage} auth={props.authenticated} />
            <RequireAuth exact path="/new" component={PostPage} auth={props.authenticated} />
            <RequireAuth exact path="/user/:userId" component={UserPage} auth={props.authenticated} />
            <Route exact path="/no-auth" component={AuthNote} />
        </Switch>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(AppRouter);
