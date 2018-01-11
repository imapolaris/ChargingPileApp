import {COMPLETE_REQUEST_WEB_ACTION, START_REQUEST_WEB_ACTION} from "./actions";

export function web(state={
    isFetching: false,
}, action) {
    switch (action.type) {
        case START_REQUEST_WEB_ACTION:
            return Object.assign({}, state, {isFetching: true});
        case COMPLETE_REQUEST_WEB_ACTION:
            return Object.assign({}, state, {isFetching: false});
        default:
            return state;
    }
}