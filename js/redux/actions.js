import {getAllStationsWithBriefInfo, getSingleStation} from "../common/webapi";

export const CHARGING_ACTION = 'CHARGING';
export const SUBSCRIBE_ACTION = 'SUBSCRIBE';

export const LOGIN_ACTION = 'LOGIN'; // 登录
export const LOGOUT_ACTION = 'LOGOUT'; // 登出
export const REGISTER_ACTION = 'REGISTER'; // 注册

export const LOCATING_ACTION = 'LOCATING'; // 定位
export const ENABLE_TRAFFIC_ACTION = 'ENABLE_TRAFFIC'; // 显示路况信息
export const START_REQUEST_STATION_MARKERS_ACTION = 'START_REQUEST_STATION_MARKERS'; // 开始请求电站地图标识
export const ERROR_REQUEST_STATION_MARKERS_ACTION = 'ERROR_REQUEST_STATION_MARKERS'; // 请求电站地图标识报错
export const RECEIVE_STATION_MARKERS_ACTION = 'RECEIVE_STATION_MARKERS'; // 电站地图标识
export const RECEIVE_ONE_STATION_INFO_ACTION = 'RECEIVE_ONE_STATION_INFO'; // 一个电站

export const START_REQUEST_WEB_ACTION = 'START_REQUEST_WEB';
export const COMPLETE_REQUEST_WEB_ACTION = 'COMPLETE_REQUEST_WEB';

export const STAT_CACHE_COMPLETED_ACTION = 'STAT_CACHE_COMPLETED'; // 统计系统缓存
export const CLEAR_CACHE_COMPLETED_ACTION = 'CLEAR_CACHE_COMPLETED'; // 清除缓存完成
export const CHECK_VERSION_COMPLETED_ACTION = 'CHECK_VERSION_COMPLETED_ACTION'; // 检查软件版本
export const MESSAGE_NOTICE_SWITCH_ACTION = 'MESSAGE_NOTICE_SWITCH'; // 新消息提醒开关

export const QUERY_WALLET_INFO_COMPLETED_ACTION = 'QUERY_WALLET_INFO_COMPLETED'; // 查询钱包信息
export const PAY_BY_WX_COMPLETED_ACTION = 'PAY_BY_WX_COMPLETED'; // 微信充值
export const PAY_BY_ZFB_COMPLETED_ACTION = 'PAY_BY_ZFB_COMPLETED'; // 支付宝充值

export function doLogin(phoneNumber, pwd, checkWay){
    return {
        type: LOGIN_ACTION,
        phoneNumber,
        pwd,
        checkWay,
    };
}

export function doLogout(){
    return {
        type: LOGOUT_ACTION
    };
}

export function doRegister(phoneNumber, pwd){
    return {
        type: REGISTER_ACTION,
        phoneNumber,
        pwd,
    };
}

import {Geolocation} from 'react-native-baidu-map';
function doLocating(currentPos) {
    return {
        type: LOCATING_ACTION,
        currentPos
    };
}

export function getCurrentPosition() {
    return dispatch => Geolocation.getCurrentPosition()
        .then(data=>{
                dispatch(doLocating(data));
            },
            error=>{
                throw new Error(error);
            });
}

export function doEnableTraffic() {
    return {
        type: ENABLE_TRAFFIC_ACTION,
    };
}

function startRequestStationMarkers(){
    return {
        type: START_REQUEST_STATION_MARKERS_ACTION,
    };
}

function errorRequestStationMarkers(){
    return {
        type: ERROR_REQUEST_STATION_MARKERS_ACTION,
    };
}

function receiveStationMarkers(stations) {
    return {
        type: RECEIVE_STATION_MARKERS_ACTION,
        stations
    };
}

export function doRequestStationMarkers(filter) {
    return dispatch => {
        dispatch(startRequestStationMarkers());
        getAllStationsWithBriefInfo(filter)
            .then(data=>{
                if (data !== null && data !== undefined && data.length > 0){
                    let stations = [];
                    data.forEach((item)=>{
                        stations.push({
                            title: `${item.id},${item.name}`,
                            longitude: item.longitude,
                            latitude: item.latitude
                        });
                    });

                    dispatch(receiveStationMarkers(stations));
                }
            })
            .catch(error=>{
                dispatch(errorRequestStationMarkers());

                console.log(error);
                throw new Error(error);
            });
    }
}

function receiveOneStationInfo(station) {
    return {
        type: RECEIVE_ONE_STATION_INFO_ACTION,
        station
    }
}

export function doRequestOneStationInfo(e) {
    if (e === null || e === undefined) return;

    let info = e.title.split(',');
    if (info.length <= 1) {
        //prompt('信息错误！');
        return;
    }
    let id = info[0];

    return dispatch => {
        dispatch(startRequestWeb());
        getSingleStation(id)
            .then(data=>{
                dispatch(receiveOneStationInfo(data));

                dispatch(completeRequestWeb());
            })
            .catch(error=>{
                dispatch(completeRequestWeb());
                console.log(error);
                throw new Error(error);
            });
    }
}

function startRequestWeb(){
    return {
        type: START_REQUEST_WEB_ACTION,
    };
}

function completeRequestWeb() {
    return {
        type: COMPLETE_REQUEST_WEB_ACTION,
    };
}

function switchMessageNoticeCompleted(notice){
    return {
        type: MESSAGE_NOTICE_SWITCH_ACTION,
        notice
    };
}

export function doSwitchMessageNotice(notice) {

}

function statCacheCompleted(cache){
    return {
        type: STAT_CACHE_COMPLETED_ACTION,
        cache
    };
}

export function doStatCache(){

}

function clearCacheCompleted(){
    return {
        type: CLEAR_CACHE_COMPLETED_ACTION,
    };
}

export function doClearCache() {

}

function checkVersionCompleted(version){
    return {
        type: CHECK_VERSION_COMPLETED_ACTION,
        version
    };
}

export function doCheckVersion(){

}

function queryWalletInfoCompleted(data) {
    return {
        type: QUERY_WALLET_INFO_COMPLETED_ACTION,
        data
    };
}

export function doQueryWalletInfo() {

}

function payByWxCompleted(money){
    return {
        type: PAY_BY_WX_COMPLETED_ACTION,
        money,
    };
}

export function doPayByWx(money) {

}

function payByZfbCompleted(money) {
    return {
        type: PAY_BY_ZFB_COMPLETED_ACTION,
        money
    };
}

export function doPayByZfb(money) {

}