import {combineReducers} from 'redux';
import {user} from "./user";
import {map} from "./map";

const rootReducer = combineReducers({
    user,
    map,
});

export default rootReducer;