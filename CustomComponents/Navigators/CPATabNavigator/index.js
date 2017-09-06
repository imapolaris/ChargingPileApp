import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';

import {TabNavigator} from 'react-navigation';
import HomePage from "../../../CustomPages/HomePage/index";
import MePage from "../../../CustomPages/MePage/index";

import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CPATabNavigator = TabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions:{
                title:'找电桩',
                tabBarIcon:({tintColor}) => {
                    return (
                        <Icon name="home" size={16} color={tintColor} />
                    );
                },
            },
        },
        /*Scan:{
            screen: ScanPage,
            navigationOptions: {
                title: '扫一扫',
                tabBarIcon:({tintColor}) => {
                    return (
                        <Icon name="camera" size={16} color={tintColor} />
                    );
                },
            }
        },*/
        Me: {
            screen: MePage,
            navigationOptions: {
                title: '我的',
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Icon name="people" size={16} color={tintColor}/>
                    );
                },
            },
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: '#e91e63',
            showIcon:true,
            tabStyle:{
                flexDirection:'row',
            }
        },
    }
);


class CPATabScreen extends Component{
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <CPATabNavigator style={styles.navigator}
                                 screenProps={{nav: navigate}}
                />
            </View>
        );
    }
}

export default CPATabScreen;