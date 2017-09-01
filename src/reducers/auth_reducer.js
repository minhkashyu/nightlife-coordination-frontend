import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
    } from './../actions/types';

const INITIAL_STATE = {
    isAuthenticated: false,
    error: ''
};

const authReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case AUTH_USER:
            return {...state, isAuthenticated: true, error: ''};
        case UNAUTH_USER:
            return {...state, isAuthenticated: false, error: ''};
        case AUTH_ERROR:
            return {...state, error: action.payload};
    }
    return false;
};

export default authReducer;