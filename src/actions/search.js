import axios from 'axios';
import {
    errorHandler,
    API_URL,
    getRequest,
    postRequest
    } from './index';
import {
    FETCHING,
    NOT_FETCHING,
    RECEIVE_RESULTS,
    RESET_RESULTS,
    SELECT_RESULT,
    FETCH_BARS,
    FETCH_MY_BARS,
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
        getRequest(FETCH_MY_BARS, SEARCH_ERROR, true, false, url, dispatch, cookies);
    };
};

export const addBar = (placeId, name, address) => {
    return (dispatch, getState, cookies) => {
        let url = '/bars';
        let data = {
            placeId,
            name,
            address
        };
        postRequest(ADD_BAR, SEARCH_ERROR, true, false, url, dispatch, cookies, data);
    };
};

export const removeBar = (barId) => {
    return (dispatch, getState, cookies) => {
        dispatch({ type: FETCHING });
        let requestUrl = API_URL + `/bars/${barId}`;
        let headers = { headers: { Authorization: cookies.get('token') } };

        axios.delete(requestUrl, headers)
            .then((response) => {
                dispatch({
                    type: REMOVE_BAR,
                    payload: response.data,
                    barId
                });
                dispatch({ type: NOT_FETCHING });
            })
            .catch((error) => {
                errorHandler(dispatch, error, SEARCH_ERROR);
            });
    };
};