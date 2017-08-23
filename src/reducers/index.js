import { combineReducers } from 'redux';
import commonReducer from './common_reducer';

const rootReducer = combineReducers({
    common: commonReducer
});

export default rootReducer;