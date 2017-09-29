import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import StationListItem from "../../CustomComponents/StationListItem/index";
import icons from '../../Common/fonts';
import colors from '../../Common/colors';
import {getNearbyStations} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import Icon from 'react-native-vector-icons/Ionicons';
import {AlertSelected, showMapSelector} from "../../CustomComponents/AlertSelected/index.android";


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

        showMapSelector(this._mapSelector,
            {start:null, end: {longitude: item.longitude, latitude: item.latitude}});
    };

    _renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <StationListItem key={item.key}
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

                <AlertSelected ref={self=>this._mapSelector=self}/>
            </View>
        );
    }
}

export function renderSeparator(){
    return (
        <View style={styles.separator} />
    );
}

export function renderBottom(){
    return (
        <View style={styles.bottomContainer}>
            <Text style={styles.bottom}>
                我是有底线的...
            </Text>
        </View>
    );
}

export function renderEmpty(refreshing, EmptyDataGreetings) {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.empty}>
                {refreshing ? LoadingGreetings : EmptyDataGreetings}
            </Text>
            <Icon name={refreshing ? "md-happy" : "md-sad"} size={20} color={colors.tintColor} />
        </View>
    );
}

export default CPAListPage;