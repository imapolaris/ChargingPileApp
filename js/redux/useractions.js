import {changePwd, login, register, resetPwd, sendMessage, updateUserProfile} from "../common/webapi";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {doBack} from "./navactions";
import {ToastBL, ToastBS, validatePhoneNumber} from "../common/functions";
import {doQueryChargingInfo} from "./chargingactions";
import {doQueryWalletInfo} from "./walletactions";

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS'; // 登录成功
export const LOGIN_FAILED_ACTION = 'LOGIN_FAILED'; // 登录失败
export const LOGOUT_ACTION = 'LOGOUT'; // 登出
export const REGISTER_ACTION = 'REGISTER'; // 注册
export const RESET_PWD_ACTION = 'RESET_PWD'; // 重置密码
export const QUERY_PERSONAL_INFO_ACTION = 'QUERY_PERSONAL_INFO'; // 查询个人信息
export const UPDATE_PERSONAL_INFO_ACTION = 'UPDATE_PERSONAL_INFO'; // 更新个人信息

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS_ACTION,
        id: data.id,
        nickname: data.nickname,
        phoneNumber: data.telephone,
        address: 'beijing China',
        avatar: data.avatar,
    }
}

export function doLogin(phoneNumber, pwd, userCategory) {
    return dispatch => {
        dispatch(startRequestWeb('正在登录...'));

        login(phoneNumber, pwd, userCategory)
            .then(ret => {
                dispatch(completeRequestWeb());

                if (ret.result === true) {
                    ToastBS(`登录成功！`);

                    dispatch(loginSuccess(Object.assign({}, ret.data, {userCategory, avatar: JSON.parse(ret.data.avatar)})));
                    dispatch(doBack());

                    // 查询用户充电统计信息
                    dispatch(doQueryChargingInfo());
                    // 查询用户钱包信息
                    dispatch(doQueryWalletInfo());
                } else {
                    ToastBS(ret.message);

                    dispatch({
                        type: LOGIN_FAILED_ACTION,
                    });
                }
            })
            .catch(error => {
                console.log(error);
                ToastBS('登录失败:' + error);

                dispatch(completeRequestWeb());
            });
    };
}

export function doLogout() {
    return dispatch => {
        dispatch({type: LOGOUT_ACTION});
        ToastBS('已退出登录');
        dispatch(doBack());
    };
}

export function doRegister(phoneNumber, vcode, pwd) {
    if (!validateInput(phoneNumber, vcode, pwd))
        return;

    return dispatch => {
        dispatch(startRequestWeb('正在提交信息，请稍等...'));

        register(phoneNumber, vcode, pwd)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result === true) {
                    ToastBS('注册成功，请登录！');
                    dispatch(doBack());
                } else {
                    ToastBS(`注册失败: ${ret.message}`);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`注册失败: ${err}`);
            })
    };
}

export function doResetPwd(phoneNumber, vcode, pwd) {
    if (!validateInput(phoneNumber, vcode, pwd))
        return;

    return dispatch => {
        dispatch(startRequestWeb('正在提交信息，请稍等...'));

        resetPwd(phoneNumber, vcode, pwd)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result === true) {
                    ToastBS('重置成功，请登录！');
                    dispatch(doBack());
                } else {
                    ToastBS(`${ret.message}`);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    };
}

function validateInput(phoneNumber, vCode, pwd){
    if (phoneNumber.length <= 0 || !validatePhoneNumber(phoneNumber)) {
        ToastBL('手机号不正确！');
        return false;
    }

    if (vCode.length !== 6) {
        ToastBL('验证码不正确！');
        return false;
    }

    if (pwd.length <= 0) {
        ToastBL('密码不能为空！');
        return false;
    }

    return true;
}

export function doGetVcode(phoneNumber) {
    return dispatch => {
        return sendMessage(phoneNumber)
            .then(ret=>{
                if (ret.result){
                    ToastBS('验证码已发送！');
                } else {
                    ToastBS(`${ret.message}`);
                }

                return ret.result;
            })
            .catch(err=>{
                ToastBS(`${err}`);
                console.log(err);
                return false;
            })
    }
}

export function doChangePwd(oldPwd, newPwd) {
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

export function doSavePersonalInfo(data) {
    return (dispatch, getState) => {
        dispatch(startRequestWeb('正在保存...'));
        const {userId} = getState().user;
        const personal = Object.assign({}, data, {id: userId, sex: '男', avatar: JSON.stringify(data.avatar)});
        updateUserProfile(personal)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    dispatch({
                        type: UPDATE_PERSONAL_INFO_ACTION,
                        data: Object.assign({}, personal, {avatar: JSON.parse(personal.avatar)}),
                    });
                    ToastBS('保存成功！');

                    dispatch(doBack());
                } else {
                    ToastBS(`保存失败: ${ret.message}`)
                }
            })
            .catch(err=>{
                console.log(err);
                ToastBS('保存失败...');
                dispatch(completeRequestWeb());
            })
    }
}