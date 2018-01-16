import {
    aliPay,
    changePwd,
    getAllStationsWithBriefInfo,
    getSingleStation,
    getWalletBalance,
    login,
    makeOneCharge,
    wxPay
} from "../common/webapi";
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';
import {Geolocation} from 'react-native-baidu-map';
import {ScreenKey} from "../common/constants";
import {NavigationActions} from "react-navigation";

export const CHARGING_ACTION = 'CHARGING';
export const SUBSCRIBE_ACTION = 'SUBSCRIBE';

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS'; // 登录成功
export const LOGIN_FAILED_ACTION = 'LOGIN_FAILED'; // 登录失败
export const LOGOUT_ACTION = 'LOGOUT'; // 登出
export const REGISTER_ACTION = 'REGISTER'; // 注册
export const RESET_PWD_ACTION = 'RESET_PWD'; // 重置密码

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

 // 统计系统缓存
 // 清除缓存完成
 // 检查软件版本
 // 新消息提醒开关

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
        //dispatch(doBack());
    };
}

export function doRegister(phoneNumber, pwd){
    return {
        type: REGISTER_ACTION,
        phoneNumber,
        pwd,
    };
}

export function doResetPwd(oldPwd, newPwd) {
    return (dispatch, getState) => {
        const {userId} = getState().user;
        let data = {id: userId, password: oldPwd, newpassword: newPwd};

        dispatch(startRequestWeb());
        changePwd(data)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result === true) {
                    //ToastAndroidBS('密码修改成功，请使用新密码重新登录！');


                    dispatch(doBack());
                } else {
                    //ToastAndroidBS(ret.message);
                }
            })
            .catch(error=>{
                dispatch(completeRequestWeb());
                console.log(error);
            });
    }
}

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
        return getSingleStation(id)
            .then(data=>{
                dispatch(completeRequestWeb());

                dispatch(receiveOneStationInfo(data));

                return data;
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

function queryWalletInfoCompleted(data) {
    return {
        type: QUERY_WALLET_INFO_COMPLETED_ACTION,
        data
    };
}

export function doQueryWalletInfo() {
    return (dispatch, getState) => {
        dispatch(startRequestWeb());
        const {userId} = getState().user;
        getWalletBalance(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                if (ret.result === true) {
                    dispatch(queryWalletInfoCompleted(ret.data));
                } else {

                }
            })
            .catch(error=>{
                console.log(error);
                dispatch(completeRequestWeb());
            });
    }
}

function payByWxCompleted(money){
    return {
        type: PAY_BY_WX_COMPLETED_ACTION,
        money,
    };
}

export function doPayByWx(money) {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        const {userId} = getState().user;

        wxPay()
            .then(ret=> {
                //dispatch(completeRequestWeb());
                let resp = JSON.parse(ret);
                let paydata = {
                    partnerId: resp.partnerid, /*商家向财付通申请的商家id*/
                    prepayId: resp.prepayid, /*预支付订单*/
                    nonceStr: resp.noncestr, /*随机串，防重发*/
                    timeStamp: resp.timestamp, /*时间戳，防重发*/
                    package: resp.package, /*商家根据财付通文档填写的数据和签名*/
                    sign: resp.sign, /*商家根据微信开放平台文档对数据做的签名*/
                };
                console.log(`预支付结果：${ret}`);
                WeChat.pay(paydata)
                    .then(res => {
                        console.log(`调用微信接口返回：${res}`);
                        makeOneCharge(userId, money, "微信支付")
                            .then(result=>{
                                dispatch(payByWxCompleted(result.data));
                            })
                            .catch(error=>{
                                console.log(error);
                            });
                    }, err => {
                        console.log(`调用微信接口报错：${err}`);
                    });


            })
            .catch(error=>{
                console.log(error);
                //dispatch(completeRequestWeb());
            });
    }
}

function payByZfbCompleted(money) {
    return {
        type: PAY_BY_ZFB_COMPLETED_ACTION,
        money
    };
}

export function doPayByZfb(money) {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        aliPay()
            .then(data => {
                Alipay.pay(data)
                    .then(ret => {
                            console.log(JSON.stringify(ret));

                            const {userId} = getState().user;
                            makeOneCharge(userId, money, "支付宝支付")
                                .then(res=>{
                                    //dispatch(completeRequestWeb());
                                    if (res.result) {
                                        dispatch(payByZfbCompleted(res.data));
                                    }
                                })
                                .catch(error=>{
                                    console.log(error);
                                    dispatch(completeRequestWeb());
                                });
                        },
                        err => console.log(err)
                    )
                    .catch(err=>{
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function doNav(screenKey) {
    return (dispatch, getState) => {
        switch (screenKey) {
            case ScreenKey.PersonalInfo:
            case ScreenKey.MyMessage:
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