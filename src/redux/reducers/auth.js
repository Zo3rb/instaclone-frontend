import { AUTH_ERROR, AUTH_USER, AUTH_OFF, CLEAR_ERROR, LOGIN_USER } from '../actions/types';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    currentUser: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload.token, currentUser: { ...action.payload.newUser } };
        case LOGIN_USER:
            return { ...state, authenticated: action.payload.token, currentUser: { ...action.payload.loggedUser } };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case AUTH_OFF:
            return { ...state, authenticated: action.payload, currentUser: {} };
        case CLEAR_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
};
