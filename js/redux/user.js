import {LOGIN_FAILED_ACTION, LOGIN_SUCCESS_ACTION, LOGOUT_ACTION, REGISTER_ACTION} from "./actions";

export function user(state={
    logined: false,
    userId: '',
    nickname: '',
    gender: '未知',
    avatar: '',
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS_ACTION:
            return Object.assign({}, state, {logined: true, userId: action.id, nickname: action.nickname});
        case LOGIN_FAILED_ACTION:
        case LOGOUT_ACTION:
            return Object.assign({}, state, {logined: false});
        case REGISTER_ACTION:
            break;
        default:
            return state;
    }
}