import React, {Component} from 'react';
import {View, FlatList, Text, ScrollView} from 'react-native';

import styles from './styles';
import {TabNavigator} from 'react-navigation';
import {Button} from 'react-native-elements';
import ElectricPileListItem from "../../CustomComponents/ElectricPileListItem/index";
import colors from '../../Common/colors';
import {AlertSelected, showMapSelector} from "../../CustomComponents/AlertSelected/index.android";

class CPADetailsPage extends Component{
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <StationNavigator screenProps={{nav: navigate}} />
            </View>
        );
    }
}

// 基本信息
class CPABasicInfoPage extends Component{
    // 导航
    _mapNavigation = () => {
        showMapSelector(this._mapSelector, {});
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

                <AlertSelected ref={self=>this._mapSelector=self} />
            </View>
        );
    }
}

// 电桩信息
class CPAElectricPileInfoPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chargingPiles: [],
            refreshing: false,

        };
    }

    // 导航
    _subscribeCharging = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Subscribe');
    };

    _renderItem = ({item}) => {
        return (
            <ElectricPileListItem title={item.title}
                                  status={item.status}
                                  serialNumber={item.sn}
                                  pileType={item.pt}
                                  unitPrice={item.up}
            />
        );
    };

    render() {
        const data = [
            {
                key: 1,
                title: '1#充电桩',
                status: '在线',
                sn: '100023',
                pt: '交流式',
                up: '1.00元/度',
            },
            {
                key: 2,
                title: '2#充电桩',
                status: '在线',
                sn: '100024',
                pt: '交流式',
                up: '1.00元/度',
            },
            {
                key: 3,
                title: '3#充电桩',
                status: '在线',
                sn: '100025',
                pt: '直流式',
                up: '1.00元/度',
            },
            {
                key: 4,
                title: '4#充电桩',
                status: '在线',
                sn: '100026',
                pt: '交流式',
                up: '1.00元/度',
            },
        ];

        return (
            <View style={styles.infoContainer}>
                <ScrollView style={styles.contentContainer}>
                    <FlatList data={this.state.chargingPiles}
                              renderItem={this._renderItem} />
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
                backgroundColor: colors.theme1,
            }
        },
    }
);

export default CPADetailsPage;