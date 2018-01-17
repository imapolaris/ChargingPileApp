'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from "react-navigation";
import colors from "../common/colors";
import {EmptyPlaceHolder} from "../components/placeholder";
import {ChargingBillingRecord} from "../components/billingrecord";

class ChargingBillingRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [
                {
                    key: 1,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 2,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 3,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
            ],
        };
    }

    _renderEmpty = () => {
        return EmptyPlaceHolder(this.state.refreshing, '没有找到充电账单...');
    };

    _renderItem = ({item}) => {
        const {key, title, subtitle, content} = item;

        return (
            <ChargingBillingRecord key={key}
                                   title={title}
                                   subtitle={subtitle}
                                   content={content} />
        );
    };

    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={()=>{}}
                          ListEmptyComponent={this._renderEmpty} />
            </View>
        );
    }
}

class BatteryTestingBillingRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [
                {
                    key: 1,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 2,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
                {
                    key: 3,
                    title: '充电度数',
                    subtitle: '日期',
                    content: '花费',
                },
            ],
        };
    }

    _renderEmpty = () => {
        return EmptyPlaceHolder(this.state.refreshing, '没有找到充电账单...');
    };

    _renderItem = ({item}) => {
        const {key, title, subtitle, content} = item;

        return (
            <ChargingBillingRecord key={key}
                                   title={title}
                                   subtitle={subtitle}
                                   content={content} />
        );
    };

    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={()=>{}}
                          ListEmptyComponent={this._renderEmpty} />
            </View>
        );
    }
}

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
                height: 45,
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
    contentContainer: {
        borderTopWidth: 0.1,
    }
});