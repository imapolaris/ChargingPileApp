'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../common/colors";

class RechargeItem extends Component{
    render() {
        const {payWay, payDate, money} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.payWay}>
                        {payWay}
                    </Text>
                    <Text style={styles.payDate}>
                        {payDate}
                    </Text>
                </View>

                <Text style={styles.money}>
                    {money} 元
                </Text>
            </View>
        );
    }
}

export default RechargeItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: colors.white,
        alignItems: 'center',
        marginBottom: 1,
    },
    leftContainer: {
        flex: 1,
    },
    payWay: {
        fontSize: 14,
    },
    payDate: {
        fontSize: 12,
    },
    money: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 18,
    },
});
