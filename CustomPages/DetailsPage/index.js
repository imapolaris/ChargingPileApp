import React, {Component} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';

import styles from './styles';
import {TabNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';

class CPADetailsPage extends Component{
    // 导航
    _mapNavigation = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('MapNav');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <StationNavigator />
                </View>

                <View style={styles.actionContainer}>
                    <Button title="导航"
                            onPress={this._mapNavigation}
                            buttonStyle={styles.button}
                    />
                </View>
            </View>
        );
    }
}

// 基本信息
class CPABasicInfoPage extends Component{
    render() {
        return (
            <ScrollView>
                <Text>
                    基本信息
                </Text>
            </ScrollView>
        );
    }
}

// 电桩信息
class CPAElectricPileInfoPage extends Component{
    render() {
        return (
            <ScrollView>
                <Text>
                    电桩信息
                </Text>
            </ScrollView>
        );
    }
}

const StationNavigator = TabNavigator(
    {
        Basic: {
            screen: CPABasicInfoPage,
            navigationOptions: {
                title: '基本信息'
            },
        },
        ElectricPile: {
            screen: CPAElectricPileInfoPage,
            navigationOptions: {
                title: '电桩信息'
            },
        }
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: '#e91e63',
            showIcon:false,
            tabStyle:{
                flexDirection:'row',
            }
        },
    }
);

export default CPADetailsPage;