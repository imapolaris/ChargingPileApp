import React, {Component} from 'react';
import {View} from 'react-native';

import {TabNavigator} from 'react-navigation';
import HomePage from "../../../CustomPages/HomePage/index";
import MePage from "../../../CustomPages/MePage/index";

const CPATabNavigator = TabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:{
                title:'找电桩',
            }
        },
        Me: {
            screen: MePage,
            navigationOptions:{
                title: '我',
            }
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: '#e91e63',
        }
    }
);

export default CPATabNavigator;