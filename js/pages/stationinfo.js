'use strict';

import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {IconType} from "../common/icons";
import {Divider, Icon} from "react-native-elements";
import {ActiveOpacity} from "../common/constants";
import KeyValPair from "../components/keyvalpair";
import ChargingPileItem from "../components/chargingpileitem";
import {EmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import {TabNavigator} from "react-navigation";
import MapNavButton from "../components/mapnavbutton";

const LoadingGreetings = '正在加载，请稍后...';
const EmptyDataGreetings = '客官，没有找到电桩啊！';
class StationInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            position: null,
            data: null,
            chargingPiles: [],
            refreshing: true,
        };
    }

    render() {
        //const {nav} = this.props.screenProps;
        //const {station} = this.props.navigation.state.params;
        const station = {address:'China',};

        return (
            <ScrollView style={styles.station}>
                <View style={styles.stationPicContainer}>
                    <Text>电站图片</Text>
                </View>
                <View style={styles.stationAddressContainer}>
                    <View style={styles.stationAddressLeftContainer}>
                        <Text style={styles.address}>
                            {station && station.address}
                        </Text>
                    </View>

                    <MapNavButton address={station.address} buttonStyle={styles.mapNavButton} />
                </View>
                <View style={styles.stationInfoContainer}>
                    <KeyValPair horizontal={true} title="电价"
                                val={1.0 + '元/度'}
                                titleStyle={styles.label} valueStyle={styles.content}/>
                    <KeyValPair horizontal={true} title="支付方式"
                                val={'本APP支付'}
                                titleStyle={styles.label} valueStyle={styles.content}/>
                    <KeyValPair horizontal={true} title="营业时间"
                                val={'00:00 - 24:00'}
                                titleStyle={styles.label} valueStyle={styles.content}/>
                    <KeyValPair horizontal={true} title="充电使用次数"
                                val={5 + '次'}
                                titleStyle={styles.label} valueStyle={styles.content}/>
                </View>
            </ScrollView>
        );
    }
}

class ChargingPileInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chargingPiles: [
                {
                    key: 1,
                    name: '1#',
                    status: '空闲',
                    serialNumber: '001',
                    pileType: '交流'
                },
                {
                    key: 2,
                    name: '2#',
                    status: '使用中',
                    serialNumber: '002',
                    pileType: '直流'
                },
                {
                    key: 3,
                    name: '3#',
                    status: '已预约',
                    serialNumber: '003',
                    pileType: '交流'
                },
            ],
            refreshing: false,
        };
    }

    _onRefresh = () => {

    };

    _renderEmpty = () => {
        return EmptyPlaceHolder(this.state.refreshing, LoadingGreetings, EmptyDataGreetings);
    };

    _renderSeparator = () => {
        return SeparatorPlaceHolder();
    };

    _renderItem = ({item}) => {
        return (
            <ChargingPileItem name={item.name}
                              status={item.status}
                              serialNumber={item.serialNumber}
                              pileType={item.pileType}
                              onSubscribe={() => {

                              }}
            />
        );
    };

    render() {
        return (
            <ScrollView style={styles.chargingPile}>
                <Divider />
                <FlatList data={this.state.chargingPiles}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          /*ItemSeparatorComponent={this._renderSeparator()}
                          ListEmptyComponent={this._renderEmpty()}*/ />
            </ScrollView>
        );
    }
}

class CommentInfo extends Component{
    render() {
        return (
            <ScrollView style={styles.comment}>
                <Text>评论</Text>
            </ScrollView>
        );
    }
}

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
            activeTintColor: colors.tintColor,
            inactiveTintColor: colors.grey2,
            showIcon:false,
            tabStyle:{
                flexDirection:'row',
                backgroundColor: colors.white,
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

class CPAStationInfoPage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <CPAStationTabNavigator/>
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
    station: {
        flex: 1,
    },
    chargingPile: {
        flex: 1,
    },
    comment: {
        flex: 1,
    },
    stationPicContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        paddingLeft: 10,
        marginTop: 1,
        flexDirection: 'row',
    },
    stationAddressContainer: {
        marginTop: 10,
        backgroundColor: colors.white,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    stationAddressLeftContainer: {
        flex: 1,
    },
    mapNavButton: {
        width: 60,
        height: 60,
    },
    stationInfoContainer: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 10,
        paddingLeft: 10,
        paddingTop: 10,
    },
    title:{
        fontSize: 17,
        color: colors.primary1,
    },
    address: {
        fontSize: 15,
        color: colors.grey3,
    },
    info: {
        fontSize: 15,
        color: colors.grey3,
    },
    label: {
        fontSize: 15,
        color: colors.grey2,
    },
    content: {
        fontSize: 14,
        marginLeft: 25,
        color: colors.grey3,
    },
});