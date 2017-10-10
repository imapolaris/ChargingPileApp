import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import styles from './styles';
import {TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import ElectricPileListItem from "../../CustomComponents/ElectricPileListItem/index";
import colors from '../../Common/colors';
import {AlertSelected, showMapSelector} from "../../CustomComponents/AlertSelected/index.android";
import icons from '../../Common/fonts';
import {getChargingPiles, getStationDetails, makeOneSubscribe} from "../../Common/webApi";
import {ToastAndroidBS} from "../../Common/functions";
import {renderBottom, renderEmpty, renderSeparator} from "../ListPage/index";

class CPADetailsPage extends Component{
    render() {
        return (
            <View style={styles.container}>
                <StationNavigator screenProps={{nav: this.props.navigation}} />
            </View>
        );
    }
}

// 基本信息
class CPABasicInfoPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            position: null,
            data: null,
        };
    }

    componentDidMount() {
        this._init();
    }

    _init = () => {
        let {nav} = this.props.screenProps;
        let {station} = nav.state.params;
        if (station === null || station === undefined) {
            return;
        }

        this.setState({
            ...this.state,
            position: {longitude: station.longitude, latitude: station.latitude},
        });

        let {id} = station;
        this._requestStationDetails(id);
    };

    _requestStationDetails = (stationId) => {
        getStationDetails(stationId)
            .then(ret=>{
                if (ret !== null && ret !== undefined && ret.result === true) {
                    this.setState({
                        ...this.state,
                        data: ret.data,
                    });
                }
            })
            .catch(err=>{
                console.log(err);
                ToastAndroidBS(err.message);
            });
    };

    // 导航
    _mapNavigation = () => {
        showMapSelector(this._mapSelector, {start:null, end:this.state.position});
    };

    render() {
        const {nav} = this.props.screenProps;
        const {station} = nav.state.params;

        return (
            <ScrollView style={styles.contentContainer}>
                <View style={styles.stationTitleContainer}>
                    <ImageBackground style={styles.stationImage}>
                        <Text style={{color: colors.white}}>电站图片</Text>
                    </ImageBackground>
                    <View style={styles.stationTitleRightContainer}>
                        <Text style={styles.title}>
                            {station && station.name}
                        </Text>
                        <View style={styles.stationTitleContentContainer}>
                            <Text style={styles.info}>
                                电价：{this.state.data && this.state.data.price} 元/度
                            </Text>
                            <Text style={styles.info}>
                                营业时间：00:00 - 24:00
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.stationAddressContainer}>
                    <View style={styles.stationAddressLeftContainer}>
                        <Text style={styles.address}>
                            {station && station.address}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.stationAddressRightContainer}
                                      onPress={this._mapNavigation}
                                      activeOpacity={0.9}>
                        <Icon type={icons.Ionicon} name="md-navigate" size={18} color={colors.white} />
                        <Text style={styles.navigate}>
                            导航
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.stationInfoContainer}>
                    <Text style={styles.info}>
                        <Text>
                            {this.state.data && this.state.data.introduce || '这里是电站的介绍信息'}
                        </Text>
                    </Text>
                </View>

                <AlertSelected ref={self=>this._mapSelector=self} />
            </ScrollView>
        );
    }
}


const EmptyDataGreetings = '客官，没有找到电桩啊！';
// 电桩信息
class CPAElectricPileInfoPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chargingPiles: [],
            refreshing: true,
        };
    }

    componentDidMount() {
        this._init();
    }

    _init = () =>{
        let {nav} = this.props.screenProps;
        let {station} = nav.state.params;
        if (station === null || station === undefined){
            this._onRefreshStatusChanged(false);
            return;
        }

        let {id} = station;
        getChargingPiles(id)
            .then(ret=>{
                if (ret !== null && ret !== undefined && ret.length > 0) {
                    let data = ret.map((item, index)=>{
                        return Object.assign({}, item, {key: index})
                    });

                    this.setState({
                        ...this.state,
                        chargingPiles: data,
                        refreshing: false,
                    });
                } else {
                    this._onRefreshStatusChanged(false);
                }
            })
            .catch(err=>{
                console.log(err);
                //ToastAndroidBS(err.message);
                this._onRefreshStatusChanged(false);
            });
    };

    _onRefreshStatusChanged = (status)=>{
        this.setState({
            ...this.state,
            refreshing: status,
        });
    };

    // 预约
    _subscribeCharging = (item) => {
        if (item.status === '在线'){
            this._subscriber.show('预约充电', [{key:0, title:'预约'}], (i)=>{
                switch (i) {
                    case 0:
                        this._makeOneSubscribe(item);
                        break;
                    default:
                        break;
                }
            });
        }
    };

    _makeOneSubscribe = (item)=>{
        let userId = AppContext.userId;
        let sn = item.serialNumber;
        makeOneSubscribe(userId, sn)
            .then(ret=>{
                if (ret.result === true) {
                    /*const {nav} = this.props.screenProps;
                    const {navigate} = nav;
                    navigate && navigate('Subscribe');*/

                    ToastAndroidBS('预约成功');
                } else {
                    ToastAndroidBS(ret.message);
                }
            })
            .catch(err=>{
                console.log(err);
                ToastAndroidBS(err.message);
            });
    };

    _renderItem = ({item}) => {
        return (
            <ElectricPileListItem title={item.name}
                                  status={item.status}
                                  serialNumber={item.serialNumber}
                                  pileType={item.category}
                                  unitPrice={item.price}
                                  onPress={()=>{
                                      this._subscribeCharging(item);
                                  }}
            />
        );
    };

    _onRefresh = () => {
        this._init();
    };

    _renderEmpty = () => {
        return renderEmpty(this.state.refreshing, EmptyDataGreetings);
    };

    render() {
        return (
            <ScrollView style={styles.contentContainer}>
                <FlatList data={this.state.chargingPiles}
                          renderItem={this._renderItem}
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          ItemSeparatorComponent={renderSeparator}
                          ListEmptyComponent={this._renderEmpty} />

                <AlertSelected ref={self=>this._subscriber=self}/>
            </ScrollView>
        );
    }
}

const StationNavigator = TabNavigator(
    {
        Basic: {
            screen: CPABasicInfoPage,
            navigationOptions: {
                title: '基本信息',
            },
        },
        ElectricPile: {
            screen: CPAElectricPileInfoPage,
            navigationOptions: {
                title: '电桩信息'
            },
        }
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,

        tabBarOptions:{
            activeTintColor: '#e91e63',
            showIcon:false,
            tabStyle:{
                flexDirection:'row',
                backgroundColor: colors.theme1,
                marginBottom: 1,
            },
        },
        navigationOptions:{
            tabBarVisible: true,
        }
    }
);

export default CPADetailsPage;