import './Common/appStorage';
import './Common/appContext';

import React, {Component} from 'react';
import {StyleSheet, BackHandler, View, StatusBar} from 'react-native';
import CPAStackNavigator from './CustomComponents/Navigators/CPAStackNavigator';
import {createStore} from 'redux';
import constants from './Common/constants';
import {appInit} from "./Common/appContext";
import colors from './Common/colors';
import { NavigationActions } from 'react-navigation';

import JPushModule from 'jpush-react-native';

let lastBackPressed = 0;
/*let store = createStore(null);*/

class App extends Component{
    componentWillMount() {
        // initialize the app context.
        appInit();

        this._registerJPushModule();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);

        this._unRegisterJPushModule();
        try{
            AppContext.clearListeners();
        } catch (ex){
            console.log(ex);
        }
    }

    _registerJPushModule = ()=>{
        JPushModule.notifyJSDidLoad((resultCode)=>{
            if (resultCode === 0) {
            }
        });
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
            if (url !== null && url !== undefined && url !== '')
                this._navigateToMessagePage(url);
        });
        // 自定义消息
        JPushModule.addReceiveCustomMsgListener((map)=>{
            console.log('message: ' + map.message)
        });
    };

    _unRegisterJPushModule = ()=>{
        JPushModule.removeOpenNotificationLaunchAppEventListener();
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    };

    _navigateToMessagePage = (url)=>{

        this._navigator && this._navigator.dispatch(
            NavigationActions.navigate({
                routeName: 'Notification',
                params: {url: url},
            })

        );
    };

    _onBackAndroid = () => {
        /*let now = new Date().getTime();
        if(now - lastBackPressed < 2500) {
            return false;
        }
        lastBackPressed = now;
        ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
        return true;*/
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.theme1} barStyle="light-content"/>
                <CPAStackNavigator ref={self=>this._navigator=self} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});

export default App;