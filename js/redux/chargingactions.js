import {ToastBS} from "../common/functions";
import {getChargingStatus, queryChargingBillingRecords, startCharging, stopCharging} from "../common/webapi";
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
    return (dispatch, getState) => {
        //dispatch(doLoadInChargingPage());
        dispatch(doBack());
        dispatch(startRequestWeb('启动充电中，请稍后！'));

        const {userId} = getState().user;
        startCharging(userId, sn)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    dispatch(startChargingCompleted());
                    dispatch(doNav(ScreenKey.InCharging));

                    // app充电中
                    dispatch(doChangeAppStatus(AppStatus.Charging));
                } else {
                    ToastBS(ret.message);
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

export function doQueryChargingRealtimeInfo(sn) {
    return (dispatch) => {
        return getChargingStatus(sn)
            .then(ret=>{
                if (ret.result) {
                    return true;
                } else {
                    ToastBS(ret.message);
                    console.log(ret.message);
                }
            })
            .catch(err=>{
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

function finishChargingCompleted() {
    return {
        type: FINISH_CHARGING_ACTION,
    }
}

export function doFinishCharging(sn) {
    return (dispatch, getState) => {
        dispatch(startRequestWeb('正在停止充电...'));
        const {userId} = getState().user;

        stopCharging(userId, sn)
            .then(ret=>{
                if (ret.result) {
                    dispatch(completeRequestWeb());
                    dispatch(doChangeAppStatus(AppStatus.Normal));

                    dispatch(doBack());
                    dispatch(doNav(ScreenKey.ChargingBilling));
                } else {
                    ToastBS(ret.message);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

export function doQueryChargingBillingRecords() {
    return (dispatch, getState) => {
        const {userId} = getState().user;
        dispatch(startRequestWeb());
        return queryChargingBillingRecords(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}