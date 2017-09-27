import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import StationListItem from "../../CustomComponents/StationListItem/index";
import icons from '../../Common/fonts';
import colors from '../../Common/colors';

class CPAListPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            stations: []
        };
    }

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
        return (
            <View style={styles.container}>
                <FlatList data={this.state.stations}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={this._renderSeparator}
                          ListFooterComponent={
                              this.state.stations.length > 0 ?
                                  this._renderBottom
                                  :
                                  null
                          }
                          style={styles.content}
                />
            </View>
        );
    }
}

export default CPAListPage;