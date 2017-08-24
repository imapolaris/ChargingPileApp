import React, {Component} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';

import styles from './styles';
import {TabNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';

class CPADetailsPage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <StationNavigator />
            </View>
        );
    }
}

// 基本信息
class CPABasicInfoPage extends Component{
    // 导航
    _mapNavigation = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('MapNav');
    };

    render() {
        return (
            <View style={styles.infoContainer}>
                <ScrollView style={styles.contentContainer}>
                    <Text>
                        基本信息
                    </Text>
                </ScrollView>

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

// 电桩信息
class CPAElectricPileInfoPage extends Component{
    // 导航
    _subscribeCharging = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('MapNav');
    };

    render() {
        return (
            <View style={styles.infoContainer}>
                <ScrollView style={styles.contentContainer}>
                    <Text>
                        电桩信息
                    </Text>
                </ScrollView>

                <View style={styles.actionContainer}>
                    <Button title="预约"
                            onPress={this._subscribeCharging}
                            buttonStyle={styles.button}
                    />
                </View>
            </View>
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