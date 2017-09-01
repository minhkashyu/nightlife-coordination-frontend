import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import commonReducer from './common_reducer';
import searchReducer from './search_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    common: commonReducer,
    search: searchReducer,
    auth: authReducer
});

export default rootReducer;