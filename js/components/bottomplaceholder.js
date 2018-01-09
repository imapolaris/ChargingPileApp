'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../common/colors";

class BottomPlaceHolder extends Component{
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    我是有底线的...
                </Text>
            </View>
        );
    }
}

export default BottomPlaceHolder;

const styles = StyleSheet.create({
    container: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        color: colors.grey3,
    },
});