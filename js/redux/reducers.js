import {combineReducers} from 'redux';
import {LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION} from "./actions";

function user(state={}, action){
    switch (action.type) {
        case LOGIN_ACTION:
            break;
        case LOGOUT_ACTION:
            break;
        case REGISTER_ACTION:
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
});

export default rootReducer;