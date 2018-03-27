'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Divider, Icon} from "react-native-elements";
import colors from "../common/colors";
import {IconType} from "../common/icons";

export class SeparatorPlaceHolder extends Component{
    render() {
        return (
            <Divider style={styles.separator} />
        );
    }
}

export function EmptyPlaceHolder(EmptyDataGreetings) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {EmptyDataGreetings}
            </Text>
            <Icon type={IconType.Ionicon} name="md-sad" size={20} color={colors.tintColor} />
        </View>
    );
}

export function CommonEmptyPlaceHolder(image, text){
    return (
        <View style={styles.emptyContainer}>
            <Image source={image} style={styles.image} />
            <Text style={styles.eText}>
                {text}
            </Text>
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
        height: 5,
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
    emptyContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    eText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});