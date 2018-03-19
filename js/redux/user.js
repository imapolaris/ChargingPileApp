import {REGISTER_ACTION, UPDATE_PERSONAL_INFO_ACTION} from "./useractions";
import {LOGIN_FAILED_ACTION, LOGIN_SUCCESS_ACTION, LOGOUT_ACTION} from "./useractions";
import {UserCategory} from "../common/constants";

export function user(state={
    logined: false,
    userId: '',
    userCategory: UserCategory.Personal,
    nickname: 'alex',
    phoneNumber: '13269734774',
    avatar: null,
    address: '',
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS_ACTION:
            return Object.assign({}, state,
                {
                    logined: true,
                    userId: action.id,
                    nickname: action.nickname,
                    avatar: action.avatar,
                    address: action.address,
                    phoneNumber: action.phoneNumber,
                });
        case LOGIN_FAILED_ACTION:
        case LOGOUT_ACTION:
            return Object.assign({}, state, {logined: false});
        case REGISTER_ACTION:
            break;
        case UPDATE_PERSONAL_INFO_ACTION:
            return Object.assign({}, state,{
                nickname: action.data.nickname,
                avatar: action.data.avatar,
                address: action.data.address,
            });
        default:
            return state;
    }
}