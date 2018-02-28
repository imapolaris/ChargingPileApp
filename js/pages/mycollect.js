'use strict';

import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from "../common/colors";
import {prompt2, ToastBS} from "../common/functions";
import StationItem from "../components/stationitem";
import {EmptyPlaceHolder, SeparatorPlaceHolder} from "../components/placeholder";
import {connect} from "react-redux";
import {doClearCollectStations, doQueryCollectStations, doSelectOneStation} from "../redux/stationactions";

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

        const {setParams} = this.props.navigation;
        setParams && setParams({clearCollect: this._clearCollectStations});
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

    _clearCollectStations = () => {
        prompt2('提示', '确定要清空收藏列表吗？',
            ()=>{},
            () => {
                const {clearCollectStations} = this.props;
                clearCollectStations()
                    .then(ret=>{
                        if (ret) {
                            this.setState({stations: []});

                            ToastBS('收藏列表已清空！');
                        } else {
                            ToastBS('操作失败！');
                        }
                    })
            });
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <StationItem key={item.key}
                             name={item.name}
                             numbers={'1/2'}
                             address={item.address}
                             elecprice={item.Detail.elecPrice}
                             destination={{longitude: item.longitude, latitude: item.latitude}}
                             onAction={() => this._onSelectOneStation(item)}
                             showNavBtn={false}
                />
            </View>
        );
    };

    render() {
        const {stations} = this.state;

        return (
            <View style={styles.container}>
                <FlatList data={stations}
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
        queryCollectStations: () => dispatch(doQueryCollectStations()),
        selectOneStation: (station) => dispatch(doSelectOneStation(station)),
        clearCollectStations : () => dispatch(doClearCollectStations()),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPAMyCollectPage);

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