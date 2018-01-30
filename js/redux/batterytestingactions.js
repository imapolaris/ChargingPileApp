import {doBack, doNav} from "./navactions";
import {AppStatus, ScanAction, ScreenKey} from "../common/constants";
import {doChangeAppStatus} from "./appactions";
import {getBatteryTestingRecords} from "../common/webapi";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {ToastBS} from "../common/functions";

export const QUERY_BATTERYTESTING_INFO_ACTION = 'BATTERYTESTING_INFO';
export const START_BATTERYTESTING_ACTION = 'START_BATTERYTESTING';
export const QUERY_BATTERYTESTING_PROCESS_ACTION = 'QUERY_BATTERYTESTING_PROCESS';
export const FINISH_BATTERYTESTING_ACTION = 'FINISH_BATTERYTESTING';

export function doQueryBatteryTestingInfo() {
    return (dispatch, getState) => {
        const {userId} = getState().user;

        dispatch(startRequestWeb());
        return getBatteryTestingRecords(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

export function doQueryBatteryTestingReportDetail(reportId) {

}

export function startScanBatteryTesting() {
    return dispatch => {
        dispatch(doNav(ScreenKey.Scan, {action: ScanAction.BatteryTesting}));
    }
}

function startBatteryTestingCompleted() {
    return {
        type: START_BATTERYTESTING_ACTION,
    }
}

export function doStartBatteryTesting() {
    return (dispatch) => {
        dispatch(startBatteryTestingCompleted());

        dispatch(doChangeAppStatus(AppStatus.BatteryTesting));
        dispatch(doBack(ScreenKey.Home));
    }
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