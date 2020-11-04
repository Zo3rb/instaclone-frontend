import React, { useState } from 'react';

import { Form, FormGroup, Label, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { login, clearError } from '../redux/actions';

const Login = props => {

    // Handle Submit Method From Redux Form
    const { handleSubmit } = props;

    // States for The Error Alerts
    const [visible, setVisible] = useState(true);
    const onDismiss = () => {
        setVisible(false);
        props.clearError();
    };

    const history = useHistory();

    // Our Submission Form
    const onFormSubmit = formValues => {
        setVisible(true);
        props.login(formValues, () => history.push('/'));
    };

    // Helper Method for Rendering Auth Fail Alert
    const authFailed = () => {
        return (
            <Alert color="danger" isOpen={visible} toggle={onDismiss} className="mt-2">
                {props.authFail}
            </Alert>
        )
    };

    return (
        <div className="container-fluid">
            <div className="row py-3">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 p-3 mt-2">
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormGroup>
                            <Label for="forEmail" className="text-primary font-weight-bold h5">
                                Email <i className="fas fa-envelope"></i> :
                            </Label>
                            <Field
                                type="email"
                                name="email"
                                component="input"
                                id="forEmail"
                                placeholder="Please Enter The Email You Registered With"
                                autoComplete="off"
                                className="w-100"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="forPassword" className="text-primary font-weight-bold h5">
                                Password <i className="fas fa-key"></i> :
                            </Label>
                            <Field
                                type="password"
                                name="password"
                                component="input"
                                id="forPassword"
                                placeholder="Please Enter Your Password"
                                autoComplete="off"
                                className="w-100"
                            />
                        </FormGroup>
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary w-25"
                        />
                    </Form>
                    {props.authFail && authFailed()}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authFail: state.auth.errorMessage
    }
};

export default compose(
    connect(mapStateToProps, { login, clearError }),
    reduxForm({ form: "loginForm" })
)(Login);
