'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from "../common/colors";
import {ToastBS} from "../common/functions";
import StationItem from "../components/stationitem";
import {EmptyPlaceHolder} from "../components/placeholder";
import {connect} from "react-redux";
import {doQueryCollectStations, doSelectOneStation} from "../redux/stationactions";

const EmptyDataGreetings = '目前还没有收藏电站，赶紧去收藏一个吧！';
class CPAMyCollectPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
        };
    }

    componentDidMount() {
        this._requestNearbyStations();
    }

    _requestNearbyStations = () => {
        const {queryCollectStations} = this.props;
        queryCollectStations()
            .then(ret=>{
                this.setState({
                    stations: ret
                });
            })
    };

    _onSelectOneStation = (item) => {
        if (!item){
            ToastBS('电站信息错误，无法查看详情！');
            return;
        }

        const {selectOneStation} = this.props;
        selectOneStation && selectOneStation(item);
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <StationItem key={item.key}
                             name={item.name}
                             numbers={item.numbers}
                             address={item.address}
                             elecprice={0}
                             destination={{longitude: item.longitude, latitude: item.latitude}}
                             onAction={() => this._onSelectOneStation(item)}
                />
            </View>
        );
    };

    _renderEmpty = () => {
        return EmptyPlaceHolder(EmptyDataGreetings);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.stations}
                          renderItem={this._renderItem}
                          style={styles.content}
                          ListEmptyComponent={this._renderEmpty()} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryCollectStations: () => dispatch(doQueryCollectStations()),
        selectOneStation: (station) => dispatch(doSelectOneStation(station)),
    }
}

export default connect((state)=>state, mapDispatchToProps)(CPAMyCollectPage);

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