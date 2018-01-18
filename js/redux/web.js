import {COMPLETE_REQUEST_WEB_ACTION} from "./webactions";
import {START_REQUEST_WEB_ACTION} from "./webactions";

export function web(state={
    isFetching: false,
    waitingLabel: '正在加载，请稍后...',
}, action) {
    switch (action.type) {
        case START_REQUEST_WEB_ACTION:
            return Object.assign({}, state, {isFetching: true, waitingLabel: action.label || state.waitingLabel});
        case COMPLETE_REQUEST_WEB_ACTION:
            return Object.assign({}, state, {isFetching: false, waitingLabel: '正在加载，请稍后...'});
        default:
            return state;
    }
}