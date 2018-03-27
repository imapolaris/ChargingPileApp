'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from "../common/colors";
import {TabNavigator} from "react-navigation";
import StationInfo from "./stationinfo";
import ChargingPileInfo from "./chargingpileinfo";

const CPAStationTabNavigator = TabNavigator(
    {
        Station: {
            screen: StationInfo,
            navigationOptions: {
                title: '详情',
            },
        },
        ChargingPile: {
            screen: ChargingPileInfo,
            navigationOptions: {
                title: '电桩',
            },
        },
        /*Comment: {
            screen: CommentInfo,
            navigationOptions: {
                title: '评论',
            }
        }*/
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: 'rgba(255, 255, 255, 1)',
            inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
            showIcon:false,
            tabStyle:{
                flexDirection:'row',
                marginBottom: 1,
                height: 40,
            },
            style: {
                backgroundColor: colors.theme1,
            },
            labelStyle: {
                fontSize: 16,
            },
            indicatorStyle: {
                height: 2,
                backgroundColor: colors.white,
            },
        },
        navigationOptions:{
            tabBarVisible: true,
        }
    }
);

class CPAStationInfoPage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPAStationTabNavigator screenProps={{nav: this.props.navigation}}/>
            </View>
        );
    }
}

export default CPAStationInfoPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
});