import React, {Component} from 'react';
import {View, Button, Modal, FlatList} from 'react-native';

import styles from './styles';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import {getCurrentLocation, gotoNavigation, mapApp, ToastAndroidCL} from "../../Common/functions";
import {AlertSelected} from "../../CustomComponents/AlertSelected/index";
import {AlertStationBriefInfo} from "../../CustomComponents/AlertStationBriefInfo/index";
import StationListItem from "../../CustomComponents/StationListItem/index";
import {getAllStationsWithBriefInfo, getSingleStation} from '../../Common/webApi';

const selectedArr = [{key:1, title:"百度地图"}, {key:2, title:"高德地图"}];
let position = null;
let currentPosition = null;

class CPAHomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 5,
            center: {
                longitude: 108.552500,
                latitude: 34.322700,  // 这是北京天安门的坐标(116.404185,39.91491)
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [],
            mapOrList: 'map',
        };
    }

    componentWillMount() {
        //this._currentLocation();
    }

    // 组件已挂载
    componentDidMount() {
        this._requestStations();
    }

    // 定位
    _currentLocation() {
        getCurrentLocation()
            .then(
                data=>{
                    this.setState({
                        ...this.state,
                        center: {
                            longitude: data.longitude,
                            latitude: data.latitude,
                        }
                    });

                    currentPosition = {longitude: data.longitude, latitude: data.latitude};
                },
                error=>{
                    console.log(error);
                    ToastAndroidCL(error);
                });
    }

    // 请求电站信息
    _requestStations() {
        getAllStationsWithBriefInfo()
            .then(data=>{
                let stations = [];
                data.forEach((item)=>{
                    stations.push({
                        title: `${item.Id},${item.Name}`,
                        longitude: item.Longitude,
                        latitude: item.Latitude})
                });

                this.setState({
                    ...this.state,
                    markers: stations,
                })
            })
            .catch(error=>{
                console.log(error);
                ToastAndroidCL('请求电站信息失败，请检查网络是否正确连接！');
            });
    };

    _toLocation = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Location');
    };

    _toList = () => {
        if (this.state.mapOrList === 'map') {
            this.setState({
                ...this.state,
                mapOrList: 'list'
            });

            this._titleBar.setState({
                ...this._titleBar.state,
                rightLabel: '地图',
            });
        } else if (this.state.mapOrList === 'list') {
            this.setState({
                ...this.state,
                mapOrList: 'map'
            });

            this._titleBar.setState({
                ...this._titleBar.state,
                rightLabel: '列表',
            });
        }
    };

    _search = (text) => {
        Geolocation.geocode(text, text)
            .then(location=>{
                if (location.longitude === null || location.longitude === undefined
                    || location.latitude === null || location.latitude === undefined)
                {
                    alert('请输入正确、合法的地名！');
                    return;
                }

                this.setState({
                    ...this.state,
                    center: {
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                })
            })
            .catch(error=>{
                console.log(`cannot analyse the address, error: ${error}`);
            });
    };

    // 扫一扫
    _onStartChargingPress = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Scan', {headerVisible: true});
    };

    // 显示电站基本信息
    _showStationBriefInfo = (e) => {
        let info = e.title.split(',');
        if (info.length <= 1) {
            alert('信息错误！');
            return;
        }
        let id = info[0];
        getSingleStation(id)
            .then(response=>{
                if (response === null || response === undefined) {
                    //alert('');
                    return;
                }

                this._station.show(response.Name,
                    response.Numbers,
                    response.Address,
                    (i)=>{
                        switch (i)
                        {
                            case 0:
                                const {nav} = this.props.screenProps;
                                nav && nav('Details');
                                break;
                            case 1:
                                position = e.position;
                                this.showAlertSelected();
                                break;
                            default:
                                break;
                        }
                    });
            })
            .catch(error=>{
                console.error(error);
                alert('没有找到该电站的信息...');
            });
    };

    showAlertSelected(){
        this._navigator.show("请选择导航地图", selectedArr, '#333333', this.callbackSelected);
    }
    // 回调
    callbackSelected(i){
        let theMap = 'cp:cancel';
        switch (i) {
            case 0:
                theMap = mapApp.bdMap;
                break;
            case 1:
                theMap = mapApp.gdMap;
                break;
            default:
                break;
        }

        if (theMap !== 'cp:cancel') {
            if (position === null || position === undefined)
            {
                alert('目的地无法解析，无法导航！');
                return;
            }

            gotoNavigation(theMap,
                currentPosition,
                position,
                (succeed, msg)=>{
                    alert(msg);
                });
        }
    }

    _onDetailsPress = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Details');
    };

    _onNavPress = () => {
        this.showAlertSelected();
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

    _renderMapView() {
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map}
                    onMarkerClick={(e) => {this._showStationBriefInfo(e)}}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>

                <ActionButton buttonColor='rgba(231,76,60,1)'
                              onPress={this._onStartChargingPress}
                              icon={<Icon name="md-qr-scanner" style={styles.actionButtonIcon} />}
                              position="center"
                              offsetX={0}
                              offsetY={20}
                              buttonText="扫码充电"
                />
            </View>
        );
    };

    _renderListView() {
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
                <FlatList data={data}
                          renderItem={this._renderItem}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <DefinedTitleBar ref={self=>this._titleBar=self}
                                 toLocation={this._toLocation}
                                 toList={this._toList}
                                 search={this._search} />

                {
                    this.state.mapOrList === 'map' ? this._renderMapView() : this._renderListView()
                }

                <AlertStationBriefInfo ref={self=>{
                    this._station = self;
                }}/>

                <AlertSelected ref={self=>{
                    this._navigator = self;
                }} />
            </View>
        );
    }
}

export default CPAHomePage;