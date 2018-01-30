import {ToastBS} from "../common/functions";
import {startCharging} from "../common/webapi";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {doChangeAppStatus} from "./appactions";
import {AppStatus, ScanAction, ScreenKey} from "../common/constants";
import {doBack, doLoadInChargingPage, doNav} from "./navactions";

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

export function doQueryChargingInfo() {
    return (dispatch, getState) => {
        const {logined, userId} = getState().user;
        if (!logined) return;

        dispatch({
            type: QUERY_CHARGING_INFO_ACTION,
            data
        });
    }
}

export function doStartScanCharging() {
    return (dispatch, getState) => {
        /*const {balance} = getState().wallet;
        if (balance <= 0) {
            prompt('余额不足，请先充值！');
            return;
        }*/

        /*if (balance <= 20) {
            prompt('余额较低，请注意！');
            return;
        }*/

        dispatch(doNav(ScreenKey.Scan, {action: ScanAction.Charging}));
    }
}

function startChargingCompleted() {
    return {
        type: START_CHARGING_ACTION,
    }
}

export function doStartCharging(sn) {
    return (dispatch) => {
        dispatch(startRequestWeb('启动充电中，请稍后！'));
        startCharging(sn)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    dispatch(startChargingCompleted());

                    // app充电中
                    dispatch(doChangeAppStatus(AppStatus.Charging));

                    //dispatch(doBack());
                    //dispatch(doNav(ScreenKey.InCharging));

                    dispatch(doLoadInChargingPage());
                } else {
                    ToastBS(`启动充电失败：${ret.message}`);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`启动充电失败：${err}`);
                console.log(err);
            });
    }
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
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        dispatch(doChangeAppStatus(AppStatus.Normal));

        dispatch(doBack());
        dispatch(doNav(ScreenKey.ChargingBilling));
    }
}