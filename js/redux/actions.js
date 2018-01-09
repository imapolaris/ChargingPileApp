export const CHARGING_ACTION = 'CHARGING';
export const SUBSCRIBE_ACTION = 'SUBSCRIBE';

export const LOGIN_ACTION = 'LOGIN'; // 登录
export const LOGOUT_ACTION = 'LOGOUT'; // 登出
export const REGISTER_ACTION = 'REGISTER'; // 注册

export const LOCATING_ACTION = 'LOCATING'; // 定位

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
export function doLocating(data) {
    return {
        type: LOCATING_ACTION,
        data
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