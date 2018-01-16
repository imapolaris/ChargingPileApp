export const QUERY_CHARGING_INFO_ACTION = 'CHARGING_INFO';
export const START_CHARGING_ACTION = 'START_CHARGING';
export const QUERY_CHARGING_REALTIME_INFO_ACTION = 'QUERY_CHARGING_REALTIME_INFO';
export const FINISH_CHARGING_ACTION = 'FINISH_CHARGING';

function queryChargingInfoCompleted(data) {
    return {
        type: QUERY_CHARGING_INFO_ACTION,
        data
    }
}

function doQueryChargingInfo() {
    return (dispatch, getState) => {

    }
}

function startChargingCompleted() {
    return {
        type: START_CHARGING_ACTION,
    }
}

export function doStartCharging() {

}

function queryChargingRealtimeInfoCompleted() {
    return {
        type: QUERY_CHARGING_REALTIME_INFO_ACTION,
    }
}

export function doQueryChargingRealtimeInfo() {

}

function finishChargingCompleted() {
    return {
        type: FINISH_CHARGING_ACTION,
    }
}

export function doFinishCharging() {

}