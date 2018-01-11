'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from "react-native-elements";
import colors from "../common/colors";
import {IconType} from "../common/icons";

export class SeparatorPlaceHolder extends Component{
    render() {
        return (
            <View style={styles.separator} />
        );
    }
}

export function EmptyPlaceHolder(refreshing, LoadingGreetings, EmptyDataGreetings) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {refreshing ? LoadingGreetings : EmptyDataGreetings}
            </Text>
            <Icon type={IconType.Ionicon} name={refreshing ? "md-happy" : "md-sad"} size={20} color={colors.tintColor} />
        </View>
    );
}

export class BottomPlaceHolder extends Component{
    render() {
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>
                    我是有底线的...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: colors.grey3,
    },
    separator: {
        height: 10,
    },
    bottomContainer: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomText: {
        fontSize: 12,
        color: colors.grey3,
    },
});