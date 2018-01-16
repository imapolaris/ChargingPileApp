import {changePwd, login} from "../common/webapi";

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS';// 登录成功
export const LOGIN_FAILED_ACTION = 'LOGIN_FAILED';// 登录失败
export const LOGOUT_ACTION = 'LOGOUT';// 登出
export const REGISTER_ACTION = 'REGISTER';// 注册
export const RESET_PWD_ACTION = 'RESET_PWD';// 重置密码

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

export function doLogin(phoneNumber, pwd, checkWay) {
    return dispatch => {
        //dispatch(startRequestWeb());

        login(phoneNumber, pwd)
            .then(ret => {
                //dispatch(completeRequestWeb());

                if (ret.result === true) {
                    // 登录成功
                    // ToastAndroidBS(`登录成功！`);

                    dispatch(loginSuccess(ret.data));
                    //dispatch(doBack());
                } else {
                    // 登录失败
                    // ToastAndroidBS(ret.message);

                    dispatch(loginFailed());
                }
            })
            .catch(error => {
                console.log(error);
                //ToastAndroidBS('登录失败:'+error);

                //dispatch(completeRequestWeb());
            });
    };
}

export function doLogout() {
    return dispatch => {
        dispatch({type: LOGOUT_ACTION});
        //dispatch(doBack());
    };
}

export function doRegister(phoneNumber, pwd) {
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

        //dispatch(startRequestWeb());
        changePwd(data)
            .then(ret => {
                //dispatch(completeRequestWeb());

                if (ret.result === true) {
                    //ToastAndroidBS('密码修改成功，请使用新密码重新登录！');


                    //dispatch(doBack());
                } else {
                    //ToastAndroidBS(ret.message);
                }
            })
            .catch(error => {
                //dispatch(completeRequestWeb());
                console.log(error);
            });
    }
}