import React, {Component} from 'react';
import {View, TouchableOpacity, Button, Text} from 'react-native';

import {StackNavigator} from 'react-navigation';
import CPAMapPage from "../../../CustomPages/HomePage/MapPage/index";
import CPAListPage from "../../../CustomPages/HomePage/ListPage/index";

import styles from './styles';

// navigator button.
class NavButton extends Component{
    _onPress = () => {
        alert('nav');
    };

    render() {
        return (
            <View style={styles.navContainer}>
                <TouchableOpacity>
                    <Text onPress={this.props.onPress || this._onPress}
                          style={styles.navButton}>
                        {this.props.label || 'Nav' }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
                                alert('location in 北京!!!');
                            }} />
                        </View>
                    ),
                    headerRight: (
                        <NavButton label="列表" onPress={() => {
                            console.log(navigation);
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
        }
    },
    {

    }
);

export default CPAHomeStackNavigator;