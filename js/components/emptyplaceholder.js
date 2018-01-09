'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from "react-native-elements";
import colors from "../common/colors";
import {IconType} from "../common/icons";

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
});