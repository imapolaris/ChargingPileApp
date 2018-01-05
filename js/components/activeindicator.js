'use strict';

import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";

class CPAActiveIndicator extends Component{
    render() {
        const {animating, showLabel, label, containerStyle} = this.props;

        return (
            <View style={[styles.container, containerStyle]}>
                <ActivityIndicator
                    animating={animating}
                    size={60}
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

CPAActiveIndicator.propTypes = {

};

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