import {AppStatus} from "../common/constants";
import {ON_APP_STATUS_CHANGED_ACTION} from "./appactions";

export function app(state={
    status:AppStatus.Normal
}, action) {
    switch (action.type) {
        case ON_APP_STATUS_CHANGED_ACTION:
            return Object.assign({}, state, action.status);
        default:
            return state;
    }
}