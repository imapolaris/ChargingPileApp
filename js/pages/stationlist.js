'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {ToastAndroidBS} from "../common/functions";
import StationItem from "../components/stationitem";
import {EmptyPlaceHolder} from "../components/emptyplaceholder";
import SeparatorPlaceHolder from "../components/separatorplaceholder";
import BottomPlaceHolder from "../components/bottomplaceholder";
import {ScreenKey} from "../common/constants";

const LoadingGreetings = '正在加载，请稍后...';
const EmptyDataGreetings = '客官，方圆50公里的范围内都没有充电站啊！';
class CPAStationListPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stations: [
                {
                    key: 1,
                    name: '北京市',
                    address: '北京市',
                    numbers: '1/11',
                    elecprice: 1.08,
                },
                {
                    key: 2,
                    name: '滕州市',
                    address: '滕州市',
                    numbers: '2/3',
                    elecprice: 2.0,
                },
                {
                    key: 3,
                    name: '上海市',
                    address: '上海市',
                    numbers: '1/3',
                    elecprice: 1.35,
                },
            ],
            refreshing: false,
        };
    }

    // 刷新完成
    _onRefreshStatusChanged = (status) => {
        this.setState({
            ...this.state,
            refreshing: status,
        });
    };

    _onDetailsPress = (item) => {
        if (item === null || item === undefined){
            ToastAndroidBS('电站信息错误，无法查看详情！');
            return;
        }

        const {navigate} = this.props.navigation;
        navigate(ScreenKey.StationInfo, {station: item});
    };

    _onNavPress = (item) => {
        if (item === null || item === undefined){
            ToastAndroidBS('电站信息错误，无法进行导航！');
            return;
        }

        /*showMapSelector(this._mapSelector,
            {start:null, end: {longitude: item.longitude, latitude: item.latitude}});*/
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <StationItem key={item.key}
                             name={item.name}
                             numbers={item.numbers}
                             address={item.address}
                             elecprice={item.elecprice}
                             onAction={() => this._onDetailsPress(item)}
                             gotoMapNav={() => this._onNavPress(item)}
                />
            </View>
        );
    };

    _renderEmpty = () => {
        return EmptyPlaceHolder(this.state.refreshing, LoadingGreetings, EmptyDataGreetings);
    };

    _renderSeparator = () => {
        return SeparatorPlaceHolder();
    };

    _renderBottom = () => {
        return BottomPlaceHolder();
    };

    _onRefresh = () => {
        //this._requestNearbyStations();
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.stations}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={this._renderSeparator()}
                          ListFooterComponent={
                              this.state.stations.length > 0 ?
                                  this._renderBottom()
                                  :
                                  null
                          }
                          style={styles.content}
                          ListEmptyComponent={this._renderEmpty()}
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                />
            </View>
        );
    }
}

export default CPAStationListPage;

CPAStationListPage.propTypes = {

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content:{
        margin: 5,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: colors.white,
    },
    item: {
        backgroundColor: colors.white,
    },
});