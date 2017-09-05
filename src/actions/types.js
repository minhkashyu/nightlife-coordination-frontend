//= =====================
// Main Actions
//= =====================
export const FETCHING = 'fetching',
    NOT_FETCHING = 'not_fetching',
    REDIRECT = 'redirect',
    NOT_REDIRECT = 'not_redirect';

//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
    UNAUTH_USER = 'unauth_user',
    AUTH_ERROR = 'auth_error';

//= =====================
// Search Actions
//= =====================
export const RECEIVE_RESULTS = 'receive_results',
    RESET_RESULTS = 'reset_results',
    SELECT_RESULT = 'select_result',
    FETCH_BARS = 'fetch_bars',
    FETCH_MY_BARS = 'fetch_my_bars',
    FETCH_GOING_BARS = 'fetch_going_bars',
    ADD_BAR = 'add_bar',
    REMOVE_BAR = 'remove_bar',
    SEARCH_ERROR = 'search_error';