'use strict';

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Platform} from 'react-native';
import colors from "../common/colors";
import {IOSPlatform} from "../common/constants";

class CPAActiveIndicator extends Component{
    render() {
        const {animating, showLabel, label, containerStyle} = this.props;

        return (
            <View style={[styles.container, containerStyle]}>
                <ActivityIndicator
                    animating={animating}
                    size={Platform.OS === IOSPlatform ? 1 : 60}
                    color={colors.white}
                />

                {
                    showLabel ?
                        <Text style={styles.label}>
                            {label}
                        </Text>
                        :
                        null
                }
            </View>
        );
    }
}

export default CPAActiveIndicator;

CPAActiveIndicator.defaultProps = {
    showLabel: true,
    animating: true,
    label: '正在加载，请稍后...',
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 1)',
        padding: 10,
        borderRadius: 10,
    },
    label: {
        fontSize: 15,
        color: colors.white,
        marginLeft: 15,
    }
});