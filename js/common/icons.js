export const IconType = {
    ZocialIcon: 'zocial',
    OcticonIcon: 'octicon',
    MaterialIcon: 'material',
    MaterialCommunityIcon: 'material-community',
    Ionicon: 'ionicon',
    FoundationIcon: 'foundation',
    EvilIcon: 'evilicon',
    EntypoIcon: 'entypo',
    FAIcon: 'font-awesome',
    SimpleLineIcon: 'simple-line-icon',
};

import React from 'react';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from './colors';

/*
export const StationMapIcon = (tintColor, focused, size=28) => <Icon name={'md-home'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const ChargingIcon = (tintColor, focused, size=28) => <Icon name={'md-battery-charging'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const NewsIcon = (tintColor, focused, size=28) => <Icon name={'md-paper-plane'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const MeIcon = (tintColor, focused, size=28) => <Icon name={'md-person'} type={IconType.Ionicon} size={size} color={tintColor} />;
*/

export const StationMapIcon = (tintColor, focused, size=25) =>
    focused ? <Image source={require('../assets/tabIcons/Home-Click.png')} style={{width: size, height:size}} />
                : <Image source={require('../assets/tabIcons/Home.png')} style={{width: size, height:size}} />;
export const ChargingIcon = (tintColor, focused, size=25) =>
    focused ? <Image source={require('../assets/tabIcons/Charge-Click.png')} style={{width: size, height:size}} />
        : <Image source={require('../assets/tabIcons/Charge.png')} style={{width: size, height:size}} />;
export const NewsIcon = (tintColor, focused, size=25) =>
    focused ? <Image source={require('../assets/tabIcons/message-Click.png')} style={{width: size, height:size}} />
        : <Image source={require('../assets/tabIcons/message.png')} style={{width: size, height:size}} />;
export const MeIcon = (tintColor, focused, size=25) =>
    focused ? <Image source={require('../assets/tabIcons/ME-Click.png')} style={{width: size, height:size}} />
        : <Image source={require('../assets/tabIcons/ME.png')} style={{width: size, height:size}} />;
