import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import StationListItem from "../../CustomComponents/StationListItem/index";
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import icons from '../../Common/fonts';
import colors from '../../Common/colors';

class CPAListPage extends Component{
    _onDetailsPress = () => {
        const {navigate} = this.props.navigation;
        navigate('Details');
    };

    _onNavPress = () => {
        const {navigate} = this.props.navigation;
        navigate('MapNav');
    };

    _toLocation = () => {

    };

    _toList = () => {
        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <StationListItem key={item.key}
                                 title={item.title}
                                 numbers={item.numbers}
                                 address={item.address}
                                 gotoDetails={item.callback1}
                                 gotoMapNav={item.callback2}
                />
            </View>
        );
    };

    _renderSeparator = ()=>{
        return (
            <View style={styles.separator} />
        );
    };

    _renderBottom = ()=>{
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.bottom}>
                    我是有底线的...
                </Text>
            </View>
        )
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
            {
                key: 4,
                title:'回龙观东大街地铁站',
                numbers: '1/4',
                address: '北京市昌平区回龙观东大街',
                callback1: this._onDetailsPress,
                callback2: this._onNavPress,
            },
        ];

        return (
            <View style={styles.container}>
                <DefinedTitleBar ref={self=>this._titleBar=self}
                                 toLocation={this._toLocation}
                                 toList={this._toList}
                                 search={this._search}
                                 rightLabel="地图"
                                 showIcon={true}
                                 icon={<SimpleIcon type={icons.SimpleLineIcon} name="arrow-down" color={colors.white} size={14} />} />

                <FlatList data={data}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={this._renderSeparator}
                          ListFooterComponent={this._renderBottom}
                          style={styles.content}
                />
            </View>
        );
    }
}

export default CPAListPage;