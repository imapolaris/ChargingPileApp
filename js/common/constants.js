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
    ResetPwd: 'ResetPwd',
    PersonalInfo: 'PersonalInfo',
    Wallet: 'Wallet',
    InvoiceInfo: 'InvoiceInfo',
    Collect: 'Collect',
    Subscribe: 'Subscribe',
    TestingReport: 'TestingReport',
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
};

export const ActiveOpacity = 0.8;

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