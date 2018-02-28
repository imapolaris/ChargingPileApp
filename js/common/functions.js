import {Alert, ToastAndroid, Linking, PermissionsAndroid, Platform} from 'react-native';
import {Geolocation} from 'react-native-baidu-map';
import {AndroidPlatform} from "./constants";


/*
 * 展示信息（1个按钮）
 */
export function myAlert(title='',
                        msg='',
                        callback=()=>{},
                        btnTitle='ok',
                        canCancel=true) {
    Alert.alert(title,
        msg,
        [
            {text: btnTitle, onPress: ()=>callback()},
        ],
        {cancelable:canCancel});
}

/*
* 提示信息
* */
export function prompt(msg, callback) {
    myAlert('提示', msg, callback);
}

/*
* 错误信息
* */
export function error(msg, callback) {
    myAlert('错误', msg, callback);
}

/*
 * 展示信息（2个按钮）
 */
export function myAlert2(title='',
                         msg='',
                         callback1=()=>{},
                         callback2=()=>{},
                         btn1Title='cancel',
                         btn2Title='ok',
                         canCancel=true) {
    Alert.alert(title,
        msg,
        [
            {text: btn1Title, onPress: ()=>callback1()},
            {text: btn2Title, onPress: ()=>callback2()},
        ],
        {cancelable:canCancel});
}

/*
* 提示信息（2个按钮）
* */
export function prompt2(title, msg, callback1, callback2) {
    myAlert2(title, msg, callback1, callback2);
}

/*
* 错误信息（2个按钮）
* */
export function error2(msg, callback1, callback2) {
    myAlert('错误', msg, callback1, callback2);
}

/*
 * function ToastAndroid.show(...) wrapper.
 */
export function ToastBS(message) {
    if (Platform.OS === AndroidPlatform)
        ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.SHORT);
}

export function ToastBL(message) {
    if (Platform.OS === AndroidPlatform)
        ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
}

export function ToastCS(message) {
    if (Platform.OS === AndroidPlatform)
        ToastAndroid.show(message, ToastAndroid.CENTER, ToastAndroid.SHORT);
}

export function ToastCL(message) {
    if (Platform.OS === AndroidPlatform)
        ToastAndroid.show(message, ToastAndroid.CENTER, ToastAndroid.LONG);
}

/*
 * 调用地图APP（百度、高德等）进行导航
 */
export const mapApp = {bdMap: 'bdMap', gdMap:'gdMap'};
/*
 * whichApp: 调用哪个APP进行导航
 * departure: 出发地
 * destination: 目的地
 * callback: 回调函数
 */
export function gotoNavigation(whichApp, from, to, callback) {
    let uri = '';
    let succeed = true;
    let msg = '';

    if (whichApp === mapApp.bdMap){
        uri += 'baidumap://map/direction?';
        if (from !== null && from !== undefined){
            uri += 'origin=name:|latlng:' + from.latitude + ',' + from.longitude + '&';
        }
        uri += 'destination=name:|latlng:' + to.latitude + ',' + to.longitude;
        uri += '&mode=driving';
    } else if (whichApp === mapApp.gdMap) {
        uri += 'amapuri://route/plan/?sourceApplication=cp';
        if (from !== null && from !== undefined) {
            uri += '&slat=' + from.latitude;
            uri += '&slon=' + from.longitude;
        }
        uri += '&dlat=' + to.latitude;
        uri += '&dlon=' + to.longitude;
        uri += '&dev=0';
        uri += '&t=0';
    } else {
        msg = 'not supported...';
        console.error(msg);
        callback && callback(!succeed, msg);
    }

    console.log(uri);

    Linking.canOpenURL(uri)
        .then(supported => {
            if (!supported) {
                msg = 'Cannot handle url: ' + uri;
                console.error(msg);
                callback && callback(!succeed, msg)
            } else {
                return Linking.openURL(uri);
            }
        })
        .catch(error => {
            msg = 'An error occurred: ' + error;
            console.error(msg);
            callback && callback(!succeed, msg);
        });
}

/*
* get current location by baidumap.
* */
export function getCurrentLocation() {
    return Geolocation.getCurrentPosition()
        .then(response=>{
            return response;
        },
        error=>{
            throw new Error(error);
        });
}

/*
* the fetch wrapper with timeout.
* */
export function myFetch2(url, method, headers, body, timeout) {
    return Promise.race([
        myFetch(url, method, headers, body),
        setTimeout(reject('网络请求超时！'), timeout)
    ]);
}

/*
* the fetch wrapper.
* */
export function myFetch(url, method, headers, body) {
    // get method
    if (method.toUpperCase() === 'GET'){
        return fetch(url, {
            method: 'GET',
            timeout: 3000,
            headers: headers,
            contentLength: 0,
        })
            .then(response=>{
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .catch(error=>{
                throw new Error(error);
            });
    } else if (method.toUpperCase() === 'POST') { // post method
        return fetch(url, {
            method: 'POST',
            headers: headers,
            timeout: 3000,
            body: JSON.stringify(body),
        })
            .then(response=>{
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .catch(error=>{
                throw new Error(error);
            });
    }
}

/*
* validate the user name.
* */
export function validateUserName(userName) {
    let reg = /^[a-zA-Z0-9_-]{4,20}$/;
    return reg.test(userName);
}

/*
* validate whether the password is strong.
* */
export function isStrongPassword(pwd) {
    //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    let reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return reg.test(pwd);
}

/*
* validate the phone number.
* */
export function validatePhoneNumber(phoneNumber) {
    let reg = /^1[34578]\d{9}$/; //验证规则
    return reg.test(phoneNumber);
}

/*
* valid numbers.
* */
export function validNumber(number) {
    let reg = /^[0-9]*$/;
    return reg.test(number);
}

/*
* valid serial number of charging pile.
* */
export function validSerialNumber(serialNumber) {
    let reg = /^\d{10}$/;
    return reg.test(serialNumber);
}

/*
* make a call
* */
export function makeCall(telephone) {
    let uri = 'tel:'+telephone;
    Linking.canOpenURL(uri)
        .then(supported => {
            if (!supported) {
            }
            else {
                Linking.openURL(uri);
            }
        })
        .catch(error=>{
            throw new Error(error);
        });
}

/*
* send email
* */
export function sendEmail(email){
    let uri = 'mailto:'+email;
    Linking.canOpenURL(uri)
        .then(supported => {
            if (!supported) {
            }
            else {
                Linking.openURL(uri);
            }
        })
        .catch(error=>{
            throw new Error(error);
        });
}

/*
* format time.
* time: seconds.
* */
export function formatTime(time) {
    let showtime = '';

    if (time <= 0)
        showtime = '已结束';
    else {
        let day = parseInt(time / 24 / 3600);
        if (day > 0)
            showtime += `${day} 天 `;
        let hour = parseInt(time / 3600);
        if (hour > 0)
            showtime += `${hour} 时 `;
        showtime += `${parseInt((time % 3600) / 60)} 分 ${time % 60} 秒`;
    }

    return showtime;
}

/*
* request permission for camera.
* */
export function requestCameraPermission() {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then(ret=> {
            if (ret === false) {
                const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        'title': '申请使用相机权限',
                        'message': '需要使用您的相机进行扫码充电'
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED){
                    ToastAndroidBS('没有获得相应权限！');
                }
            }
        })
        .catch(err=>{
            console.log(err);
            ToastAndroidBS(err.message);
        });
}