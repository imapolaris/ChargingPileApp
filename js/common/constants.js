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
    Wallet: 'Wallet',
    Invoice: 'Invoice',
    Bill: 'Bill',
    Collect: 'Collect',
    Subscribe: 'Subscribe',
    CheckReport: '',
    Setting: 'Setting',
    MyMessage: 'MyMessage',
    UserAgreement: 'UserAgreement',
    AboutUs: 'AboutUs',
};

export const ActiveOpacity = 0.8;