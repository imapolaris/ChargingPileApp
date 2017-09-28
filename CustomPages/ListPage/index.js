import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import StationListItem from "../../CustomComponents/StationListItem/index";
import icons from '../../Common/fonts';
import colors from '../../Common/colors';
import {getNearbyStations} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import Icon from 'react-native-vector-icons/Ionicons';


const LoadingGreetings = '正在加载，请稍后...';
const EmptyDataGreetings = '客官，方圆50公里的范围内都没有充电站啊！';
class CPAListPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            stations: [],
            refreshing: true,
        };
    }

    componentDidMount() {
        this._requestNearbyStations();
    }

    _requestNearbyStations = () => {
        let {state} = this.props.navigation;
        let position = state.params.position;
        if (position !== null && position !== undefined) {
            getNearbyStations(position)
                .then(ret=>{
                    if (ret !== null && ret !== undefined && ret.length > 0) {
                        let data = ret.map((item, index)=>{
                            return Object.assign({}, item, {key: index});
                        });

                        this.setState({
                            ...this.state,
                            stations: data,
                            refreshing: false,
                        });
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this._onRefreshStatusChanged(false);
                });
        } else {
            this._onRefreshStatusChanged(false);
        }
    };

    // 刷新完成
    _onRefreshStatusChanged = (status) => {
        this.setState({
            ...this.state,
            refreshing: status,
        });
    };

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
                                 title={item.name}
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

    _renderEmpty = () =>{
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.empty}>
                    {this.state.refreshing ? LoadingGreetings : EmptyDataGreetings}
                </Text>
                <Icon name={this.state.refreshing ? "md-happy" : "md-sad"} size={20} color={colors.tintColor} />
            </View>
        );
    };

    _onRefresh = () =>{
        this._requestNearbyStations();
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
                          ListEmptyComponent={this._renderEmpty}
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                />
            </View>
        );
    }
}

export default CPAListPage;