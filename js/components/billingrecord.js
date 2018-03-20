'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../common/colors";

export class ChargingBillingRecord extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.title} 度
                    </Text>
                    <Text style={styles.subtitle}>
                        {this.props.subtitle || ' '}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.content}>
                        {this.props.content} 元
                    </Text>
                </View>
            </View>
        );
    }
}

export class BatteryTestingBillingRecord extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C3C3C3',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: colors.white,
    },
    titleContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title:{
        fontSize: 14,
    },
    subtitle:{
        fontSize: 12,
    },
    contentContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    content:{
        fontSize: 16,
    },
});