export const QUERY_BATTERYTESTING_INFO_ACTION = 'BATTERYTESTING_INFO';
export const START_BATTERYTESTING_ACTION = 'START_BATTERYTESTING';
export const QUERY_BATTERYTESTING_PROCESS_ACTION = 'QUERY_BATTERYTESTING_PROCESS';
export const FINISH_BATTERYTESTING_ACTION = 'FINISH_BATTERYTESTING';

function queryBatteryTestingInfoCompleted(data) {
    return {
        type: QUERY_BATTERYTESTING_INFO_ACTION,
        data
    }
}

function doQueryBatteryTestingInfo() {
    return (dispatch, getState) => {

    }
}

function startBatteryTestingCompleted() {
    return {
        type: START_BATTERYTESTING_ACTION,
    }
}

export function doStartBatteryTesting() {

}

function queryBatteryTestingProcessCompleted() {
    return {
        type: QUERY_BATTERYTESTING_PROCESS_ACTION,
    }
}

export function doQueryBatteryTestingProcess() {

}

function finishBatteryTestingCompleted() {
    return {
        type: FINISH_BATTERYTESTING_ACTION,
    }
}

export function doFinishBatteryTesting() {

}