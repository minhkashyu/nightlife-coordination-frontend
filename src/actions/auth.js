import axios from 'axios';
import {
    API_URL,
    errorHandler
    //getRequest
    } from './index';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCHING,
    NOT_FETCHING
    } from './types';

export const authenticatedTest = () => {
    return (dispatch, getState, cookies) => {
        const token = cookies.get('token');
        if (token) {
            dispatch({ type: AUTH_USER });
        }
        else {
            dispatch({ type: UNAUTH_USER });
        }
    };
};

const handleSuccess = (dispatch, cookies, response) => {
    cookies.set('token', response.data.token, {
        path: '/',
        maxAge: 10790 // expires in nearly 3 hours
    });
    cookies.set('user', response.data.user, {
        path: '/',
        maxAge: 10790 // expires in nearly 3 hours
    });
    dispatch({ type: NOT_FETCHING });
    dispatch({ type: AUTH_USER });
};

export const loginGithub = () => {
    return dispatch => {
        dispatch({ type: FETCHING });
        window.location = `${API_URL}/auth/github`;
    };
};

export const loginSuccess = (media, jwt) => {
    return (dispatch, getState, cookies) => {
        dispatch({ type: FETCHING });
        const headers = {
            headers: {
                Authorization: jwt,
                Media: media
            }
        };
        axios.get(`${API_URL}/auth/loginSuccess`, headers)
            .then(response => {
                handleSuccess(dispatch, cookies, response);
            })
            .catch(error => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
};

export const logout = () => {
    return (dispatch, getState, cookies) => {
        cookies.remove('token', { path: '/'});
        cookies.remove('user', { path: '/'});
        dispatch({
            type: UNAUTH_USER
        });
    };
};