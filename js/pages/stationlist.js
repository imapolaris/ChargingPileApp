'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from "../common/colors";
import {ToastBS} from "../common/functions";
import StationItem from "../components/stationitem";
import {EmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import {connect} from "react-redux";
import {doQueryNearbyStations, doSelectOneStation} from "../redux/stationactions";

const EmptyDataGreetings = '客官，方圆50公里的范围内都没有找到充电站啊！';
class CPAStationListPage extends Component{
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
        const {queryNearbyStations} = this.props;
        queryNearbyStations()
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

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.stations}
                          renderItem={this._renderItem}
                          style={styles.content}
                          ListEmptyComponent={EmptyPlaceHolder(EmptyDataGreetings)}
                          ItemSeparatorComponent={SeparatorPlaceHolder} />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryNearbyStations: () => dispatch(doQueryNearbyStations()),
        selectOneStation: (station) => dispatch(doSelectOneStation(station)),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPAStationListPage);

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