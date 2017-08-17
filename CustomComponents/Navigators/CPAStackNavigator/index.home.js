import React, {Component} from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CPAMapPage from "../../../CustomPages/HomePage/MapPage/index";
import CPAListPage from "../../../CustomPages/HomePage/ListPage/index";

import styles from './styles';
import CPALocationPage from "../../../CustomPages/HomePage/LocationPage/index";
import NavButton from '../../NavButton/index';
import CPADetailsPage from "../../../CustomPages/HomePage/DetailsPage/index";
import CPAMapNavigationPage from "../../../CustomPages/HomePage/MapNavigationPage/index";

const CPAHomeStackNavigator = StackNavigator(
    {
        Map:{
            screen: CPAMapPage,
            navigationOptions: ({navigation}) => {
                return ({
                    headerTitle: "地图",
                    headerLeft: (
                        <View>
                            <NavButton label="北京" onPress={() => {
                                navigation.navigate('Location');
                            }} />
                        </View>
                    ),
                    headerRight: (
                        <NavButton label="列表" onPress={() => {
                            //console.log(navigation);
                            navigation.navigate('List');
                        }} />
                    ),
                    headerTitleStyle: {
                        alignSelf: 'center',
                    },
                });
            }
        },
        List:{
            screen: CPAListPage,
            navigationOptions:({navigation}) => {
                return ({
                    title: '列表',
                    headerRight: (
                        <NavButton label="地图" onPress={() => {
                            navigation.goBack();
                        }} />
                    ),
                    headerTitleStyle: {
                        alignSelf: 'center',
                    },
                });
            }
        },
        Location:{
            screen: CPALocationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '选择城市',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            },
        },
        Details:{
            screen: CPADetailsPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '充电站详情',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
        MapNav:{
            screen: CPAMapNavigationPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '导航',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        },
    },
    {

    }
);

export default CPAHomeStackNavigator;