import React, {Component} from 'react';
import {View} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CPAListPage from "../../../CustomPages/ListPage/index";

import styles from './styles';
import CPALocationPage from "../../../CustomPages/LocationPage/index";
import NavButton from '../../NavButton/index';
import CPADetailsPage from "../../../CustomPages/DetailsPage/index";
import CPAMapNavigationPage from "../../../CustomPages/MapNavigationPage/index";
import CPATabScreen from "../CPATabNavigator/index";
import CPAPersonalDataPage from "../../../CustomPages/PersonalDataPage/index";

const CPAStackNavigator = StackNavigator(
    {
        Home:{
            screen: CPATabScreen,
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
                    header: null,
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
        PersonalData: {
            screen: CPAPersonalDataPage,
            navigationOptions: ({navigation}) => {
                return ({
                    title: '个人资料',
                    headerTitleStyle: {
                        alignSelf: 'center',
                    }
                });
            }
        }
    },
    {

    }
);

class App extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPAStackNavigator/>
            </View>
        );
    }
}

export default App;