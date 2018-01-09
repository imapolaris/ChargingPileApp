'use strict';

import React from 'react';
import {Platform, Alert} from 'react-native';
import Permissions from 'react-native-permissions';
import {AndroidPlatform, IOSPlatform} from "./constants";

const PermissionDesc = {
    localtion: {title: '', message: ''},
    camera: {title: '', message: ''},
    photo: {title: '', message: ''},
    microphone: {title: '', message: ''},
    contacts: {title: '', message: ''},
    event: {title: '', message: ''},
    reminder: {title: '', message: ''},
    bluetooth: {title: '', message: ''},
    notification: {title: '', message: ''},
    backgroundRefresh: {title: '', message: ''},
    speechRecognition: {title: '', message: ''},
};

export async function requestPermission(permission) {
    try {
        let result = await Permissions.check(permission);
        if (result === 'anthorized') {
            return true;
        }
        else if (result === 'undetermined'){
            let rpResult = await Permissions.request(permission);
            return rpResult === 'authorized';
        } else {
            if (Platform.OS === AndroidPlatform) {
                if (result === 'denied') {
                    let rpResult = await Permissions.request(permission);
                    return rpResult === 'authorized';
                } else if (result === 'restricted') {
                    Alert.alert(PermissionDesc[permission].title, PermissionDesc[permission].message);
                    return false;
                }
            } else if (Platform.OS === IOSPlatform) {
                if (result === 'denied') {
                    Alert.alert(PermissionDesc[permission].title, PermissionDesc[permission].message,
                        [
                            {
                                text: '关闭'
                            },
                            {
                                text: '打开设置',
                                onPress: () => {
                                    if (Permissions.canOpenSettings()) {
                                        Permissions.openSettings();
                                    }
                                }
                            }
                        ]);
                } else if (result === 'restricted') {
                    Alert.alert(PermissionDesc[permission].title, PermissionDesc[permission].message);
                    return false;
                }
            } else {
                return false;
            }
        }
    } catch (err) {
        throw new Error(err.message);
    }
}