import {PAY_BY_ZFB_COMPLETED_ACTION, PUSH_UNFINISHED_PAY_RECORD_ACTION} from "./walletactions";
import {PAY_BY_WX_COMPLETED_ACTION, QUERY_WALLET_INFO_COMPLETED_ACTION} from "./walletactions";

export function wallet(state={
    balance: 0.0,
    unfinishedPayRecords: [],
}, action){
    switch (action.type) {
        case QUERY_WALLET_INFO_COMPLETED_ACTION:
            return Object.assign({}, state, {balance: action.data.toFixed(2)});
        case PAY_BY_WX_COMPLETED_ACTION:
        case PAY_BY_ZFB_COMPLETED_ACTION:
            return Object.assign({}, state, {balance: action.money.toFixed(2)});
        case PUSH_UNFINISHED_PAY_RECORD_ACTION:
            let failRecords = [];
            let succeedRecords = action.data;
            for (let i = 0; i < state.unfinishedPayRecords.length; ++i) {
                let record = state.unfinishedPayRecords[i];
                if (!succeedRecords.contains(record.tradeno)) {
                    failRecords.push(record);
                }
            }
            return Object.assign({}, state, {unfinishedPayRecords: failRecords});
        default:
            return state;
    }
}