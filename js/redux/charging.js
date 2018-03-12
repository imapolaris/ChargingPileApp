import {
    FINISH_CHARGING_ACTION, QUERY_CHARGING_INFO_ACTION, QUERY_CHARGING_REALTIME_INFO_ACTION,
    START_CHARGING_ACTION
} from "./chargingactions";

export function charging(state={
    totalCostMoney: 0,
    totalCostTime: 0,
    totalChargingElec: 0,
    totalChargingCount: 0,

    sn: '',
    transSn: '',
    state: 0, // 0 - no charging; 1 - charging

    progress: 0,
    soc: 0,
    costMoney: 0,
    chargingElec: 0,
    costTime: 0,
    restTime: 0,
    voltage: 0,
    electric: 0,
}, action) {
    switch (action.type) {
        case QUERY_CHARGING_INFO_ACTION:
            return Object.assign({}, state, {

            });
        case START_CHARGING_ACTION:
            return Object.assign({}, state, {
                sn: action.data.sn,
                transSn: action.data.transSn,
                state: 1,
            });
        case QUERY_CHARGING_REALTIME_INFO_ACTION:
            return Object.assign({}, state, {
                progress: action.data.progress,
                soc: action.data.soc,
                costMoney: action.data.costMoney,
                chargingElec: action.data.chargingElec,
                costTime: action.data.costTime,
                restTime: action.data.restTime,
                voltage: action.data.voltage,
                electric: action.data.electric,
            });
        case FINISH_CHARGING_ACTION:
            return Object.assign({}, state, {
                state: 0,
            });
        default:
            return state;
    }
}