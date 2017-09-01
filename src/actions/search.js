import {
    errorHandler,
    getRequest
    } from './index';
import {
    FETCHING,
    NOT_FETCHING,
    RECEIVE_RESULTS,
    RESET_RESULTS,
    SELECT_RESULT,
    FETCH_BARS,
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

export const fetchBars = (query) => {
    return (dispatch, getState, cookies) => {
        let url = `/places/${query}`;
        getRequest(FETCH_BARS, SEARCH_ERROR, false, false, url, dispatch, cookies);
    };
};