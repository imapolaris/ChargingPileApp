import {combineReducers} from 'redux';
import {user} from "./user";
import {map} from "./map";
import {web} from './web';
import {nav} from "./nav";
import {wallet} from "./wallet";
import {charging} from "./charging";
import {system} from "./system";
import {app} from "./app";
import {vehicle} from "./vehicle";

const rootReducer = combineReducers({
    nav,
    user,
    map,
    web,
    wallet,
    charging,
    system,
    app,
    vehicle,
});

export default rootReducer;