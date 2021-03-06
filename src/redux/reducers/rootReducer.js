import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import postsReducer from './posts';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    posts: postsReducer
});
