import React, {Component} from 'react';
import {View, Button, ToastAndroid} from 'react-native';

import styles from './styles';
import * as WeChat from 'react-native-wechat';
import fs from 'react-native-fs';
let resolveAssetSource = require('resolveAssetSource');

import Alipay from 'react-native-yunpeng-alipay';
import {aliPay, wxPay} from "../../Common/webApi";
import {ToastAndroidBL} from "../../Common/functions";

export default class CPASharePage extends Component{
    componentDidMount() {
        WeChat.addListener('SendMessageToWX.Resp', this._shareResp);
        WeChat.addListener('SendAuth.Resp', this._loginResp);
        WeChat.addListener('PayReq.Resp', this._payResp);
    }

    componentWillUnmount() {
        WeChat.removeAllListeners();
    }

    _shareResp =(response)=> {
        try{
            if (parseInt(response.errCode) === 0) {
                console.log(JSON.stringify(response));
                ToastAndroid.show('分享成功', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            }
            else {
                ToastAndroid.show('分享失败'+JSON.stringify(response), ToastAndroid.LONG, ToastAndroid.BOTTOM);
                console.log(JSON.stringify(response));
            }
        } catch (e) {
            if (e instanceof WeChat.WechatError)
                console.log(e.trace);
            else
                console.log(e.message);
        }
    };

    _loginResp = (response)=>{
        if (parseInt(response.errCode) === 0) {
            console.log(JSON.stringify(response));
            ToastAndroid.show('登录成功', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
        else {
            ToastAndroid.show('登录失败', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            console.log(JSON.stringify(response));
        }
    };

    _payResp = (response)=>{
        if (parseInt(response.errCode) === 0) {
            console.log(JSON.stringify(response));
            ToastAndroid.show('支付成功', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
        else {
            ToastAndroid.show('支付失败' + JSON.stringify(response), ToastAndroid.LONG, ToastAndroid.BOTTOM);
            console.log(JSON.stringify(response));
        }
    };

    _loginWX = ()=>{
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        WeChat.isWXAppInstalled()
            .then((isInstalled)=>{
                if (isInstalled) {
                    WeChat.sendAuthRequest(scope, state)
                        .then((responseCode)=>{
                            alert(responseCode);
                            console.log(responseCode);
                        })
                        .catch(err=>{
                            alert('授权发生错误：', err.message);
                        })
                } else {
                    alert('没有安装微信');
                }
            })
    };

    _shareToFriend = ()=>{
        try {
            let result = WeChat.shareToSession({
                type: 'text',
                description: 'share resource image to time line',
            });
            console.log('share image url to time line successful:', result);
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        }
    };

    async _shareToTimeline(){
        try {
            let rootPath = fs.DocumentDirectoryPath;
            let savePath = rootPath + '/email-signature-262x100.png';
            console.log(savePath);

            /*
             * savePath on iOS may be:
             *  /var/mobile/Containers/Data/Application/B1308E13-35F1-41AB-A20D-3117BE8EE8FE/Documents/email-signature-262x100.png
             *
             * savePath on Android may be:
             *  /data/data/com.wechatsample/files/email-signature-262x100.png
             **/
            await fs.downloadFile({
                fromUrl: 'http://www.ncloud.hk/email-signature-262x100.png',
                toFile: savePath
            });
            let result = await WeChat.shareToTimeline({
                type: 'imageFile',
                title: 'image file download from network',
                description: 'share image file to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: "file://" + savePath // require the prefix on both iOS and Android platform
            });
            console.log('share image file to time line successful:', result);
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        }
    };

    _wxPay = ()=>{
        wxPay()
            .then(res=>{
                ToastAndroid.show(res, ToastAndroid.LONG, ToastAndroid.BOTTOM);
                let resp = JSON.parse(res);
                let paydata = {
                    partnerId: resp.partnerid,  /*商家向财付通申请的商家id*/
                    prepayId: resp.prepayid,    /*预支付订单*/
                    nonceStr: resp.noncestr,    /*随机串，防重发*/
                    timeStamp: resp.timestamp,  /*时间戳，防重发*/
                    package: resp.package,      /*商家根据财付通文档填写的数据和签名*/
                    sign: resp.sign,            /*商家根据微信开放平台文档对数据做的签名*/
                };
                ToastAndroidBL(JSON.stringify(paydata));
                WeChat.pay(paydata).then(data=>{
                    console.log(data);
                    ToastAndroidBL('success'+data);
                },err=>{
                    console.log(err);
                    ToastAndroidBL('fail '+err);
                    try{
                        if (err instanceof WeChat.WechatError){
                            ToastAndroidBL('code: ' + err.code);
                        }
                    } catch (error){
                        ToastAndroidBL('log error');
                    }
                });
            }).catch(err=> {
            console.log(err);
            ToastAndroidBL('web fail' + err);
        });
    };

    _aliPay = ()=> {
        aliPay()
            .then(data=>{
                Alipay.pay(data)
                    .then(
                        data => {
                            console.log(JSON.stringify(data));
                        },
                        err => {
                            console.log(err);
                        }
                    );
            })
            .catch(err=>{
                console.log(err);
            });
    };

    render(){
        return (
            <View style={styles.container}>
                <Button title='使用微信登录' onPress={this._loginWX}/>
                <Button title='分享给朋友' onPress={this._shareToFriend}/>
                <Button title='分享到朋友圈' onPress={this._shareToTimeline}/>
                <Button title="微信-支付" onPress={this._wxPay}/>

                <Button title="支付宝-支付" onPress={this._aliPay} />
            </View>
        );
    }
}