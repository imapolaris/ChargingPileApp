import {PAY_BY_WX_COMPLETED_ACTION, PAY_BY_ZFB_COMPLETED_ACTION, QUERY_WALLET_INFO_COMPLETED_ACTION} from "./actions";

export function wallet(state={
    balance: 0.0,
}, action){
    switch (action.type) {
        case QUERY_WALLET_INFO_COMPLETED_ACTION:
            return Object.assign({}, state);
        case PAY_BY_WX_COMPLETED_ACTION:
        case PAY_BY_ZFB_COMPLETED_ACTION:
            return Object.assign({}, state, {balance: state.balance+action.money});
        default:
            return state;
    }
}