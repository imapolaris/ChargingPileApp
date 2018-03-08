export const AndroidPlatform = 'android';
export const IOSPlatform = 'ios';

import React from 'react';
import {Dimensions, Platform} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const NavButtonMarginLeft = 10;
export const NavButtonMarginRight = 10;

export const ScreenKey = {
    Welcome: 'Welcome',
    Home: 'Home',
    Scan: 'Scan',
    StationList: 'StationList',
    StationInfo: 'StationInfo',

    Login: 'Login',
    Register: 'Register',
    ChangePwd: 'ChangePwd',
    PersonalInfo: 'PersonalInfo',
    ResetPwd: 'ResetPwd',

    Wallet: 'Wallet',
    RechargeRecords: 'RechargeRecords',
    InvoiceInfo: 'InvoiceInfo',
    Collect: 'Collect',
    Subscribe: 'Subscribe',
    Setting: 'Setting',
    MyMessage: 'MyMessage',
    UserAgreement: 'UserAgreement',
    AboutUs: 'AboutUs',
    Feedback: 'Feedback',
    MySubscribe: 'MySubscribe',
    BillingRecords: 'BillingRecords',
    LocatingCity: 'LocatingCity',
    SearchStation: 'SearchStation',
    Filter: 'Filter',

    BatteryTesting: 'BatteryTesting',
    TestingReport: 'TestingReport',
    TestingReportDetail: 'TestingReportDetail',

    VehicleInfo: 'VehicleInfo',
    AddVehicle: 'AddVehicle',
    AddAddress: 'AddAddress',
    InCharging: 'InCharging',

    ChargingBilling: 'ChargingBilling',
    Notification: 'Notification',
};

export const ActiveOpacity = 0.6;

export const APPBAR_HEIGHT = Platform.OS === IOSPlatform ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === IOSPlatform ? 20 : 0;

/*
 * 调用地图APP（百度、高德等）进行导航
 */
export const WhichMapApp = {bdMap: 'bdMap', gdMap:'gdMap'};

// 搜索历史缓存数量：10个
export const SearchHistoryCount = 10;

export default StorageKey = {
    UserProfileKey: 'userProfile',
    RecentVisitCitiesKey: 'recentVisitCities',
    SearchHistoryStationsKey: 'searchHistoryStations',
}

export const WxAppId = 'wx7310a24d430a6967';
export const WxAppSecret = 'd8bbddf8af5db6f7a96dd214a37fa813';

export const PayWay = {
    WxPay: '微信支付',
    AliPay: '支付宝支付',
};

export const AppStatus = {
    Normal: 'normal',
    Subscribe: 'subscribe',
    Charging: 'charging',
    BatteryTesting: 'batterytesting',
};

export const UserCategory = {
    Unknown: 0, // 未知用户
    Personal: 1, // 个人用户
    Group: 2, // 集团用户
};

export const ScanAction = {
    Charging: 0,
    BatteryTesting: 1,
};

export const UserAction = {
    Register: 0,
    ResetPwd: 1,
};

const RuntimeEnvType = {
    Develop: {
        ServerUri: 'http://192.168.0.201',
        Version: 0.1,
    },
    Product: {
        ServerUri: 'http://39.104.66.176',
        Version: 1.0,
    },
};
/*
* app runtime environment.
* */
export const RuntimeEnv = RuntimeEnvType.Develop;

// station images file path.
export const ImageBaseUrl = `${RuntimeEnv.ServerUri}/ChargingPileService/Res/StationImgs/`;

// charging pile code' length
export const SerialNumberLength = 16;