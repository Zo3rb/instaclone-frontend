import { POST_CREATE, POST_ERROR, CLEAR_ERROR, POSTS_FETCH } from '../actions/types';

const INITIAL_STATE = {
    posts: [],
    errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POSTS_FETCH:
            return { ...state, posts: [...action.payload] };
        case POST_CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case POST_ERROR:
            return { ...state, errorMessage: action.payload };
        case CLEAR_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
};
