import {
    errorHandler,
    getRequest,
    postRequest,
    deleteRequest
    } from './index';
import {
    FETCHING,
    NOT_FETCHING,
    RECEIVE_RESULTS,
    RESET_RESULTS,
    SELECT_RESULT,
    FETCH_BARS,
    FETCH_MY_BARS,
    FETCH_GOING_BARS,
    ADD_BAR,
    REMOVE_BAR,
    SEARCH_ERROR
    } from './types';
import _ from 'lodash';

export const resetResults = () => {
    return dispatch => dispatch({ type: RESET_RESULTS });
};

export const loadGooglePlacesAutocomplete = (value) => {
    return dispatch => {
        /* global google */
        const displaySuggestions = (predictions, status) => {
            dispatch({ type: FETCHING });
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                errorHandler(dispatch, status, SEARCH_ERROR);
            }
            let results = [];
            _.forEach(predictions, prediction => {
                results.push({
                    title: prediction.description
                });
            });
            dispatch({
                type: RECEIVE_RESULTS,
                payload: {
                    results: results
                }
            });
            dispatch({ type: NOT_FETCHING });
        };

        const service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: value }, displaySuggestions);
    };
};

export const selectResult = (query) => {
    return dispatch => {
        dispatch({
            type: SELECT_RESULT,
            payload: { query }
        });
    };
};

export const fetchBars = (query, isAuthenticated) => {
    return (dispatch, getState, cookies) => {
        let url = isAuthenticated ? `/places/loggedin/${query}` : `/places/${query}`;
        getRequest(FETCH_BARS, SEARCH_ERROR, isAuthenticated, false, url, dispatch, cookies);
    };
};

export const fetchMyBars = () => {
    return (dispatch, getState, cookies) => {
        let url = '/bars';
        getRequest(FETCH_MY_BARS, SEARCH_ERROR, true, true, url, dispatch, cookies);
    };
};

export const fetchGoingBars = () => {
    return (dispatch, getState, cookies) => {
        let url = '/bars/going';
        getRequest(FETCH_GOING_BARS, SEARCH_ERROR, true, false, url, dispatch, cookies);
    };
};

export const addBar = (placeId) => {
    return (dispatch, getState, cookies) => {
        let url = '/bars';
        postRequest(ADD_BAR, SEARCH_ERROR, true, false, url, dispatch, cookies, { 'placeId': placeId });
    };
};

export const removeBar = (barId) => {
    return (dispatch, getState, cookies) => {
        let url = `/bars/${barId}`;
        deleteRequest(REMOVE_BAR, SEARCH_ERROR, true, false, url, dispatch, cookies);
    };
};