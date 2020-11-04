import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, {
    auth: {
        authenticated: localStorage.getItem('token'),
        currentUser: JSON.parse(localStorage.getItem('user'))
    }
}, composeEnhancers(
    applyMiddleware(reduxThunk)
));

export default store;
