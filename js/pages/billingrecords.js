'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TabNavigator} from "react-navigation";
import colors from "../common/colors";
import BatteryTestingBillingRecords from "./batterytestingbillingrecords";
import ChargingBillingRecords from "./chargingbillingrecords";

const CPABillingTabNavigator = TabNavigator(
    {
        Charging: {
            screen: ChargingBillingRecords,
            navigationOptions: {
                title: '充电',
            },
        },
        BatteryTesting: {
            screen: BatteryTestingBillingRecords,
            navigationOptions: {
                title: '电池检测',
            },
        },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: colors.tintColor,
            inactiveTintColor: colors.grey2,
            showIcon:false,
            tabStyle:{
                flexDirection:'row',
                marginBottom: 1,
                height: 40,
            },
            style: {
                backgroundColor: colors.white,
            },
            labelStyle: {
                fontSize: 16,
            },
        },
        navigationOptions:{
            tabBarVisible: true,
        }
    }
);

class CPABillingRecordsPage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPABillingTabNavigator />
            </View>
        );
    }
}

export default CPABillingRecordsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
});