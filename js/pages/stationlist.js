'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {ToastAndroidBS} from "../common/functions";
import StationItem from "../components/stationitem";

class CPAStationListPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            refreshing: true,
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
        navigate('Details', {station: item});
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
                                 title={item.name}
                                 numbers={item.numbers}
                                 address={item.address}
                                 gotoDetails={()=>this._onDetailsPress(item)}
                                 gotoMapNav={()=>this._onNavPress(item)}
                />
            </View>
        );
    };


    _renderEmpty = () =>{
        return renderEmpty(this.state.refreshing, EmptyDataGreetings);
    };

    _onRefresh = () =>{
        this._requestNearbyStations();
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.stations}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={renderSeparator}
                          ListFooterComponent={
                              this.state.stations.length > 0 ?
                                  renderBottom()
                                  :
                                  null
                          }
                          style={styles.content}
                          ListEmptyComponent={this._renderEmpty}
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
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: colors.white,
    },
    item: {
        backgroundColor: colors.white,
    },
    separator: {
        height: 10,
    },
    bottomContainer: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        fontSize: 12,
        color: colors.grey3,
    },
    emptyContainer: {
        height: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        fontSize: 14,
        color: colors.grey3,
    },
});