'use strict';

import {prompt, prompt2, ToastBL, ToastBS} from "../common/functions";
import {
    getChargingStatus, queryChargingBillingRecords, queryChargingSummary, queryCurrentChargingBilling, startCharging,
    stopCharging
} from "../common/webapi";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {doChangeAppStatus} from "./appactions";
import {AppStatus, BalanceWarningLine, ScanAction, ScreenKey} from "../common/constants";
import {doBack, doLoadInChargingPage, doNav, doShowChargingBillingPage} from "./navactions";

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

        return queryChargingSummary(userId)
            .then(ret=>{
                if (ret.result) {
                    dispatch(queryChargingInfoCompleted(ret.data));

                    // 充电是否已结束？

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

export function doStartScanCharging() {
    return (dispatch, getState) => {
        const {logined} = getState().user;
        if (logined) {
            const {balance} = getState().wallet;
            if (balance <= 0) {
                prompt2('提示', '余额不足，请先充值！',
                    () => {},
                    () => {
                        dispatch(doNav(ScreenKey.Wallet));
                    });
            } else {
                if (balance <= BalanceWarningLine) {
                    ToastBL('余额较低，请注意！');
                }

                dispatch(doNav(ScreenKey.Scan, {action: ScanAction.Charging}));
            }
        } else {
            ToastBL('请先登录！');
            dispatch(doNav(ScreenKey.Login));
        }
    }
}

function startChargingCompleted(data) {
    return {
        type: START_CHARGING_ACTION,
        data
    }
}

// 启动充电
export function doStartCharging(sn) {
    return (dispatch, getState) => {
        dispatch(doBack());
        dispatch(startRequestWeb('启动充电中，请稍后！'));

        const {userId, userCategory} = getState().user;
        startCharging(userId, sn, userCategory)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    dispatch(startChargingCompleted(ret.data));

                    //dispatch(doLoadInChargingPage());

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

function queryChargingRealtimeInfoCompleted(data) {
    return {
        type: QUERY_CHARGING_REALTIME_INFO_ACTION,
        data,
    }
}

// 请求实时充电信息
export function doQueryChargingRealtimeInfo() {
    return (dispatch, getState) => {
        const {sn, transSn} = getState().charging;

        getChargingStatus(sn, transSn)
            .then(ret=>{
                if (ret.result) {
                    let data = JSON.parse(ret.data);
                    dispatch(queryChargingRealtimeInfoCompleted(data));

                    //alert(ret.data);

                    const {cpState} = ret.data;
                    // 判断充电是否已结束 (1-正在进行；2-已结束)
                    if (cpState === 2) {
                        dispatch(doNav(ScreenKey.ChargingBilling));
                        //dispatch(doChangeAppStatus(AppStatus.Normal));
                    }
                } else {
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

// 结束充电
export function doFinishCharging() {
    return (dispatch, getState) => {
        dispatch(startRequestWeb('正在停止充电...'));
        const {sn, transSn} = getState().charging;
        const {userId} = getState().user;

        stopCharging(userId, sn, transSn)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    dispatch(finishChargingCompleted());

                    dispatch(doShowChargingBillingPage());
                } else {
                    ToastBS(ret.message);
                }

                //dispatch(doChangeAppStatus(AppStatus.Normal));
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

                return ret.map((item, index)=>Object.assign({}, item, {key: index}));
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}

export function doQueryCurrentChargingBilling() {
    return (dispatch, getState) => {
        const {sn, transSn} = getState().charging;
        dispatch(startRequestWeb('正在计算本次充电账单，请稍等...'));
        return queryCurrentChargingBilling(sn, transSn)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    ToastBS('查询账单完成！');
                    //dispatch(queryCurrentChargingBillingCompleted(ret.data));
                    return JSON.parse(ret.data);
                } else {
                    ToastBS(`查询账单失败，可到账单页面查看`);
                    console.log(ret.message);
                    return null;
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
                return null;
            });
    }
}