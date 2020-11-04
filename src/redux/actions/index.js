// All The App Actions Triggers Will be Here
import axios from 'axios';

// Getting All The Types to Avoid Spelling Mistakes
import { AUTH_ERROR, AUTH_USER, AUTH_OFF, CLEAR_ERROR, LOGIN_USER, POST_CREATE, POST_ERROR, POSTS_FETCH } from './types';

// Setting The API URL
const BASE_URL = 'http://localhost:5000/api';

// Creating The Signup Action Creator
export const signup = (formProps, callback) => async dispatch => {
    try {

        const response = await axios.post(`${BASE_URL}/auth/register`, formProps);
        dispatch({
            type: AUTH_USER,
            payload: response.data
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.newUser));
        callback();

    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: "Something Went Wrong or This Email is Already Used"
        });
    }
};

// Creating The Login Action Creator
export const login = (formProps, callback) => async dispatch => {
    try {

        const response = await axios.post(`${BASE_URL}/auth/login`, formProps);
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.loggedUser));
        callback();

    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: "Something Went Wrong or The Provided Data are Invalid"
        });
    }
};

// Creating The Log off Action Creator
export const logoff = callBack => dispatch => {

    dispatch({
        type: AUTH_OFF,
        payload: ""
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    callBack();

};

// Creating Reuseable Action Creator for Erasing Any Error Messages
export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR,
        payload: ''
    });
};

// Creating The Fetching Posts Action Creator
export const fetchPosts = () => async dispatch => {
    try {

        const response = await axios.get(`${BASE_URL}/posts/all`);
        dispatch({
            type: POSTS_FETCH,
            payload: response.data.posts
        });

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error.message
        });
    }
};

// Creating The Create Post Action Creator
export const createPost = (data, callBack) => async dispatch => {
    try {

        const response = await axios.post(`${BASE_URL}/posts/create`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({
            type: POST_CREATE,
            payload: response.data.post
        });
        callBack();

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error.message
        });
    }
};
