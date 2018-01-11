
import {
    CHECK_VERSION_COMPLETED_ACTION, CLEAR_CACHE_COMPLETED_ACTION,
    MESSAGE_NOTICE_SWITCH_ACTION
} from "./actions";

export function system(state={
    cache: '0MB',
    version: '0.0.1',
    notice: true,
}, action) {
    switch (action.type) {
        case MESSAGE_NOTICE_SWITCH_ACTION:
            return Object.assign({}, state, {notice: action.notice});
        case CHECK_VERSION_COMPLETED_ACTION:
            return Object.assign({}, state, {version: action.version});
        case CLEAR_CACHE_COMPLETED_ACTION:
            return Object.assign({}, state, {cache: '0MB'});
        default:
            return state;
    }
}