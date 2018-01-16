import {
    FINISH_CHARGING_ACTION, QUERY_CHARGING_INFO_ACTION, QUERY_CHARGING_REALTIME_INFO_ACTION,
    START_CHARGING_ACTION
} from "./chargingactions";

export function charging(state={
    progress: 30,
    soc: 30.08,
    costMoney: 20.05,
    chargingElec: 15.37,
    costTime: 30.5,
    restTime: 12.6,
    voltage: 220,
    electric: 10,
}, action) {
    switch (action.type) {
        case QUERY_CHARGING_INFO_ACTION:
            return Object.assign({}, state);
        case START_CHARGING_ACTION:
            return Object.assign({}, state);
        case QUERY_CHARGING_REALTIME_INFO_ACTION:
            return Object.assign({}, state);
        case FINISH_CHARGING_ACTION:
            return Object.assign({}, state);
        default:
            return state;
    }
}