export const CHARGING_ACTION = 'CHARGING';
export const SUBSCRIBE_Action = 'SUBSCRIBE';

export const LOGIN_ACTION = 'LOGIN';
export const LOGOUT_ACTION = 'LOGOUT';
export const REGISTER_ACTION = 'REGISTER';

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