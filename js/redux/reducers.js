import {combineReducers} from 'redux';
import {user} from "./user";
import {map} from "./map";
import {web} from './web';
import {nav} from "./nav";
import {wallet} from "./wallet";
import {charging} from "./charging";

const rootReducer = combineReducers({
    nav,
    user,
    map,
    web,
    wallet,
    charging,
});

export default rootReducer;