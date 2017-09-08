import {Alert, ToastAndroid} from 'react-native';
import * as webApi from './webApi';


/*
 * 展示信息（1个按钮）
 */
export function prompt(title='',
                        msg='',
                        btnTitle='ok',
                        callback=()=>{},
                        canCancel=true) {
    Alert.alert(name,
        msg,
        [
            {text: btnTitle, onPress: ()=>callback()},
        ],
        {cancelable:canCancel});
}

/*
 * 展示信息（2个按钮）
 */
export function prompt2(title='',
                        msg='',
                        btn1Title='cancel',
                        btn2Title='ok',
                        callback1=()=>{},
                        callback2=()=>{},
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
 * send message, eg. verify code.
 */
export function sendMessage(phoneNumbers){
    let url = webApi.urls.messages+phoneNumbers;
    return fetch(url, {
        method: 'GEt',
        timeout: 3000,
        contentLength: 0,
    })
        .then(response=>response.json())
        .catch(error=>{
            console.log(error);
        })
}

/*
 * function ToastAndroid.show(...) wrapper.
 */
export function ToastAndroidBS(message) {
    ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.SHORT);
}

export function ToastAndroidBL() {
    ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
}