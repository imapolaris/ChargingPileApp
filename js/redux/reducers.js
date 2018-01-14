import {combineReducers} from 'redux';
import {user} from "./user";
import {map} from "./map";
import {web} from './web';
import {nav} from "./nav";

const rootReducer = combineReducers({
    nav,
    user,
    map,
    web,
});

export default rootReducer;