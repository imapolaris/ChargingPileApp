export const AndroidPlatform = 'android';
export const IOSPlatform = 'ios';

import React from 'react';
import {Dimensions} from 'react-native';

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
};

export const ActiveOpacity = 0.8;