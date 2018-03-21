'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, BackHandler, Platform} from 'react-native';
import {connect} from 'react-redux';
import CPAStackNavigator from "./components/navigators";
import WaitingNotice from "./components/waitingnotice";
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import {AndroidPlatform, IOSPlatform, ScreenKey, WxAppId} from "./common/constants";
import JPushModule from "jpush-react-native";
import {doNav} from "./redux/navactions";
import {ToastBS} from "./common/functions";
import {doPushUnfinishedPayRecords} from "./redux/walletactions";

let lastBackPressed;
class Root extends Component{
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);

        this._registerWeChat();
        this._registerJPushModule();

        let d = new Date();
        lastBackPressed = d.setTime(d.getMilliseconds()-2500);

        // 检查是否存在未推送的充值账单
        const {dispatch} = this.props;
        dispatch && dispatch(doPushUnfinishedPayRecords());
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);

        this._unRegisterWeChat();
        this._unRegisterJPushModule();
    }

    _registerWeChat = () => {
        WeChat.registerApp(WxAppId);
        WeChat.addListener('PayReq.Resp', this._payResp);
    };

    _unRegisterWeChat = () => {
        WeChat.removeAllListeners();
    };

    _payResp = (response) => {
        //ToastBS(JSON.stringify(response));
    };

    _registerJPushModule = ()=>{
        // 默认消息
        JPushModule.addReceiveNotificationListener((map)=>{
            console.log('alertContent: ' + map.alertContent);
            console.log('extras: ' + map.extras);
        });
        // 点击通知
        JPushModule.addReceiveOpenNotificationListener((map)=>{
            console.log('Opening notification!');
            console.log('map.extras: ' + JSON.stringify(map));
            console.log('alertContent:' + map.alertContent);

            let url = JSON.parse(map.extras).url;
            if (url) {
                const {dispatch} = this.props;
                dispatch(doNav(ScreenKey.Notification, {url: url}));
            }
        });
        // 自定义消息
        JPushModule.addReceiveCustomMsgListener((map)=>{
            console.log('message: ' + map.message)
        });

        JPushModule.getRegistrationID((registrationId)=>{
            console.log('registrationID:'+registrationId);
        });

        if (Platform.OS === AndroidPlatform) {
            JPushModule.notifyJSDidLoad((resultCode)=>{
                if (resultCode === 0) {}
            });
        }
        if (Platform.OS === IOSPlatform){
            JPushModule.addOpenNotificationLaunchAppListener((notification)=>{

            });
        }
    };

    _unRegisterJPushModule = ()=>{
        JPushModule.removeOpenNotificationLaunchAppEventListener();
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();

        if (Platform.OS === IOSPlatform){
            JPushModule.removeOpenNotificationLaunchAppEventListener();
        }
    };

    _onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            let now = new Date().getTime();
            if (now - lastBackPressed < 2500) {
                return false;
            }
            lastBackPressed = now;
            ToastBS('再点一次，退出应用！');
            return true;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {isFetching, waitingLabel, dispatch, nav} = this.props;

        return (
            <View style={styles.container}>
                <CPAStackNavigator navigation={addNavigationHelpers({dispatch, state:nav})} />

                <WaitingNotice visible={isFetching} label={waitingLabel} />
            </View>
        );
    }
}

Root.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isFetching: state.web.isFetching,
        waitingLabel: state.web.waitingLabel,
        nav: state.nav,
    }
}

export default connect(mapStateToProps)(Root);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});