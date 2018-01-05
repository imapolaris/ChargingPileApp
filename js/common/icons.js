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
import {Icon} from 'react-native-elements';
import colors from './colors';

export const SearchStationIcon = (tintColor, focused, size=28) => <Icon name={'md-home'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const ChargingIcon = (tintColor, focused, size=28) => <Icon name={'md-qr-scanner'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const MessageIcon = (tintColor, focused, size=28) => <Icon name={'md-paper-plane'} type={IconType.Ionicon} size={size} color={tintColor} />;
export const MeIcon = (tintColor, focused, size=28) => <Icon name={'md-person'} type={IconType.Ionicon} size={size} color={tintColor} />;