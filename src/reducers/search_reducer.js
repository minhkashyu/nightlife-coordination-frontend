import {
    RECEIVE_RESULTS,
    RESET_RESULTS,
    SELECT_RESULT,
    FETCH_BARS,
    FETCH_MY_BARS,
    FETCH_GOING_BARS,
    ADD_BAR,
    REMOVE_BAR,
    SEARCH_ERROR
    } from './../actions/types';

const INITIAL_STATE = {
    results: [],
    query: '',
    bars: [],
    goingBars: [],
    goingTotals: [],
    bar: {},
    error: ''
};

const searchReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case RECEIVE_RESULTS:
            return {...state, results: action.payload.results, error: ''};
        case RESET_RESULTS:
            return {...state, results: [], query: '', error: ''};
        case SELECT_RESULT:
            return {...state, query: action.payload.query, error: ''};
        case FETCH_BARS:
            return {...state, bars: action.payload.bars, goingBars: action.payload.goingBars, goingTotals: action.payload.goingTotals, error: ''};
        case FETCH_MY_BARS:
            return {...state, bars: action.payload.bars, goingBars: action.payload.goingBars, goingTotals: action.payload.goingTotals, error: ''};
        case FETCH_GOING_BARS:
            return {...state, goingBars: action.payload.goingBars, error: ''};
        case ADD_BAR:
            return {...state, bar: action.payload.bar, goingBars: action.payload.goingBars, goingTotals: action.payload.goingTotals, error: ''};
        case REMOVE_BAR:
            return {...state, bar: {}, goingBars: action.payload.goingBars, goingTotals: action.payload.goingTotals, error: ''};
        case SEARCH_ERROR:
            return {...state, error: action.payload};
    }
    return state;
};

export default searchReducer;