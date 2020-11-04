import React, { useState } from 'react';

import { Form, FormGroup, Label, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPost, clearError } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const CreatePost = props => {

    // Handle Submit Method From Redux Form
    const { handleSubmit } = props;

    // States for The Error Alerts
    const [visible, setVisible] = useState(true);
    const onDismiss = () => {
        setVisible(false);
        props.clearError();
    };
    const [photo, setPhoto] = useState(undefined);

    // Getting Clone of The Browser History
    const history = useHistory();

    // Helper Method for Rendering Posting Fail Alert
    const postFailed = () => {
        return (
            <Alert color="danger" isOpen={visible} toggle={onDismiss} className="mt-2">
                {props.postFail}
            </Alert>
        )
    }

    // Our Submission Form
    const onFormSubmit = async formValues => {
        try {
            // Sending Our Image to Cloud API
            const data = new FormData();
            data.append('file', photo);
            data.append('upload_preset', "instaclone");
            data.append('cloud_name', 'dqyayf3rf');
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dqyayf3rf/upload`, data);

            // Assign The Image String to The FormValues Object to Send to the Server
            formValues.photo = response.data.url;
            props.createPost(formValues, () => history.push('/'));
            setVisible(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row py-3">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 p-3 mt-2">
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <FormGroup>
                            <Label for="forTitle" className="text-primary font-weight-bold h5">
                                Title:
                            </Label>
                            <Field
                                type="text"
                                name="title"
                                component="input"
                                id="forTitle"
                                placeholder="Please Enter The Title of The Post"
                                autoComplete="off"
                                className="w-100"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="forBody" className="text-primary font-weight-bold h5">
                                Body:
                            </Label>
                            <Field
                                type="text"
                                name="body"
                                component="input"
                                id="forBody"
                                placeholder="Please Enter The Caption of The Post"
                                autoComplete="off"
                                className="w-100"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="forImage" className="text-primary font-weight-bold h5">
                                Image:
                            </Label>
                            <input
                                type="file"
                                name="photo"
                                id="forImage"
                                onChange={e => setPhoto(e.target.files[0])}
                            />
                        </FormGroup>
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary w-25"
                            disabled={!photo}
                        />
                    </Form>
                    {props.postFail && postFailed()}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        postFail: state.posts.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, { createPost, clearError }),
    reduxForm({ form: "postForm" })
)(CreatePost);
