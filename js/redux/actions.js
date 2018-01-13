import {getAllStationsWithBriefInfo, getSingleStation, login} from "../common/webapi";

export const CHARGING_ACTION = 'CHARGING';
export const SUBSCRIBE_ACTION = 'SUBSCRIBE';

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS'; // 登录成功
export const LOGIN_FAILED_ACTION = 'LOGIN_FAILED'; // 登录失败
export const LOGOUT_ACTION = 'LOGOUT'; // 登出
export const REGISTER_ACTION = 'REGISTER'; // 注册

export const LOCATING_ACTION = 'LOCATING'; // 定位
export const GEOCODE_COMPLETED_ACTION = 'GEOCODE_COMPLETED'; // 地理编码
export const CHOOSE_CITY_COMPLETED_ACTION = 'CHOOSE_CITY_COMPLETED'; // 选择定位城市
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

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS_ACTION,
        id: data.id,
        nickname: data.nickname,
    }
}

function loginFailed() {
    return {
        type: LOGIN_FAILED_ACTION,
    }
}

export function doLogin(phoneNumber, pwd, checkWay){
    return dispatch => {
        dispatch(startRequestWeb());

        login(phoneNumber, pwd)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result === true) {
                    // 登录成功
                    // ToastAndroidBS(`登录成功！`);

                    dispatch(loginSuccess(ret.data));
                    dispatch(doBack());
                } else {
                    // 登录失败
                    // ToastAndroidBS(ret.message);

                    dispatch(loginFailed());
                }
            })
            .catch(error=>{
                console.log(error);
                //ToastAndroidBS('登录失败:'+error);

                dispatch(completeRequestWeb());
            });
    };
}

export function doLogout(){
    return dispatch => {
        dispatch({type: LOGOUT_ACTION});
        dispatch(doBack());
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
import {ScreenKey} from "../common/constants";
import {NavigationActions} from "react-navigation";
function doLocating(position) {
    return {
        type: LOCATING_ACTION,
        position
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

function geocodeCompleted(position){
    return {
        type: GEOCODE_COMPLETED_ACTION,
        position,
    }
}

export function doGeocode(city) {
    return dispatch => {
        dispatch(startRequestWeb());

        Geolocation.geocode(city, city)
            .then(position => {
                if (position !== null && position !== undefined) {
                    //ToastAndroidBS('无法解析该地址！');
                    dispatch(geocodeCompleted({
                        longitude: position.longitude,
                        latitude: position.latitude,
                        city: city,
                    }));
                }

                dispatch(completeRequestWeb());
            })
            .catch(error => {
                console.log(`cannot analyse the address, error: ${error}`);
                //ToastAndroidBS('无法解析该地址！');

                dispatch(completeRequestWeb());
            });
    }
}

function chooseCityCompleted(city) {
    return {
        type: CHOOSE_CITY_COMPLETED_ACTION,
        city,
    }
}

export function doChooseCity(city) {
    return dispatch => {
        dispatch(chooseCityCompleted(city));

        dispatch(doGeocode(city));
    }
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

export function doNav(screenKey) {
    return (dispatch, getState) => {
        switch (screenKey) {
            case ScreenKey.PersonalInfo:
            case ScreenKey.Wallet:
            case ScreenKey.BillingRecords:
            case ScreenKey.Collect:
            case ScreenKey.MySubscribe:
            case ScreenKey.TestingReport:
            case ScreenKey.Scan:
                const {logined} = getState().user;
                if (logined) {
                    dispatch(NavigationActions.navigate({routeName: screenKey}));
                } else {
                    dispatch(NavigationActions.navigate({routeName: ScreenKey.Login}))
                }
                break;
            default:
                dispatch(NavigationActions.navigate({routeName: screenKey}));
        }
    };
}

export function doBack(key) {
    return dispatch => {
        if (key !== null){
            dispatch(NavigationActions.back({key}))
        } else {
            dispatch(NavigationActions.back());
        }
    }
}