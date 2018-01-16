import {PAY_BY_ZFB_COMPLETED_ACTION} from "./walletactions";
import {PAY_BY_WX_COMPLETED_ACTION, QUERY_WALLET_INFO_COMPLETED_ACTION} from "./walletactions";

export function wallet(state={
    balance: 0.0,
}, action){
    switch (action.type) {
        case QUERY_WALLET_INFO_COMPLETED_ACTION:
            return Object.assign({}, state, {balance: action.data});
        case PAY_BY_WX_COMPLETED_ACTION:
        case PAY_BY_ZFB_COMPLETED_ACTION:
            return Object.assign({}, state, {balance: action.money});
        default:
            return state;
    }
}