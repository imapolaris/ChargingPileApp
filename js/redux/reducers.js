import {combineReducers} from 'redux';
import {user} from "./user";
import {map} from "./map";
import {web} from './web';

const rootReducer = combineReducers({
    user,
    map,
    web,
});

export default rootReducer;