'use strict';

import {
    FINISH_BATTERYTESTING_ACTION,
    QUERY_BATTERYTESTING_INFO_ACTION, QUERY_BATTERYTESTING_PROCESS_ACTION,
    START_BATTERYTESTING_ACTION
} from "./batterytestingactions";

export function batterytesting(state={

}, action) {
    switch (action.type) {
        case QUERY_BATTERYTESTING_INFO_ACTION:
            return Object.assign({}, state);
        case START_BATTERYTESTING_ACTION:
            return Object.assign({}, state);
        case QUERY_BATTERYTESTING_PROCESS_ACTION:
            return Object.assign({}, state);
        case FINISH_BATTERYTESTING_ACTION:
            return Object.assign({}, state);
        default:
            return state;
    }
}