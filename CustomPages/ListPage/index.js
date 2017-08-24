import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import styles from './styles';

import StationListItem from "../../CustomComponents/StationListItem/index";

class CPAListPage extends Component{
    _onDetailsPress = () => {
        const {navigate} = this.props.navigation;
        navigate('Details');
    };

    _onNavPress = () => {
        const {navigate} = this.props.navigation;
        navigate('MapNav');
    };

    _renderItem = ({item}) => {
        return (
            <StationListItem key={item.key}
                             title={item.title}
                             numbers={item.numbers}
                             address={item.address}
                             gotoDetails={item.callback1}
                             gotoMapNav={item.callback2}
            />
        );
    };

    render() {
        const data = [
            {
                key: 1,
                title:'加速器一区充电站',
                numbers: '0/2',
                address: '北京市海淀区永丰产业基地加速器一区',
                callback1: this._onDetailsPress,
                callback2: this._onNavPress,
            },
            {
                key: 2,
                title:'永丰地铁站充电站',
                numbers: '2/5',
                address: '北京市海淀区永丰地铁站',
                callback1: this._onDetailsPress,
                callback2: this._onNavPress,
            },
            {
                key: 3,
                title:'回龙观东大街地铁站',
                numbers: '1/4',
                address: '北京市昌平区回龙观东大街',
                callback1: this._onDetailsPress,
                callback2: this._onNavPress,
            },
        ];

        return (
            <View style={styles.container}>
                <FlatList data={data}
                          renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default CPAListPage;