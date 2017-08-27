import {
    RECEIVE_RESULTS,
    RESET_RESULTS,
    SELECT_RESULT,
    FETCH_BARS,
    SEARCH_ERROR
    } from './../actions/types';

const INITIAL_STATE = {
    results: [],
    placeId: '',
    error: ''
};

const searchReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case RECEIVE_RESULTS:
            return {...state, results: action.payload.results, error: ''};
        case RESET_RESULTS:
            return {...state, results: [], error: ''};
        case SELECT_RESULT:
            return {...state, placeId: action.payload.placeId, error: ''};
        case FETCH_BARS:
            return {...state, bars: action.payload, error: ''};
        case SEARCH_ERROR:
            return {...state, error: action.payload};
    }
    return state;
};

export default searchReducer;