import React, {Component} from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import {getCurrentLocation, ToastAndroidCL, ToastAndroidBS, formatTime, prompt} from "../../Common/functions";
import {AlertSelected} from "../../CustomComponents/AlertSelected/index";
import {AlertStationBriefInfo} from "../../CustomComponents/AlertStationBriefInfo/index";
import {getAllStationsWithBriefInfo, getSingleStation} from '../../Common/webApi';

import icons from '../../Common/fonts';
import colors from '../../Common/colors';
import CPAScanButton from "../../CustomComponents/ScanButton/index";
import {shadowStyle} from "../../Common/styles";
import {showMapSelector} from "../../CustomComponents/AlertSelected/index.android";
import DividerLine from "../../CustomComponents/DividerLine/index";

let position = null;
let currentPosition = {longitude:116.404185, latitude: 39.91491};  // 北京天安门的坐标
const Zoom = 12.5;

class CPAHomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 5,
            center: {
                longitude: 105.552500, // 中间点坐标
                latitude: 34.322700,
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [],
            subscribe: false,
            // 计时时间
            countdown: 0,
            showtime: '',
            charging: false,
            station: null,
        };
    }

    // 组件已挂载
    componentDidMount() {
        this._init();
    }

    componentWillUnmount() {
        this._stopTimer();
    }

    _init = ()=>{
        switch (AppContext.appStatus){
            case AppStatus.Normal:
                this._requestStations();
                break;
            case AppStatus.Subscribe:
                this._startSubscribe();
                break;
            case AppStatus.Charging:
                this._startCharging();
                break;
        }
    };

    // 定位
    _currentLocation = () => {
        getCurrentLocation()
            .then(data => {
                if (data !== null && data !== undefined) {
                    this.setState({
                        ...this.state,
                        center: {
                            longitude: data.longitude,
                            latitude: data.latitude,
                        },
                        zoom: Zoom,
                    });

                    currentPosition = {longitude: data.longitude, latitude: data.latitude};
                }
            })
            .catch(error => {
                console.log(error);
                ToastAndroidBS('无法准确定位，请检查网络是否正确连接！');
            });
    };

    // 请求电站信息
    _requestStations = ()=> {
        getAllStationsWithBriefInfo()
            .then(data=>{
                if (data !== null && data !== undefined && data.length > 0){
                    let stations = [];
                    data.forEach((item)=>{
                        stations.push({
                            title: `${item.id},${item.name}`,
                            longitude: item.longitude,
                            latitude: item.latitude
                        });
                    });

                    this.setState({
                        ...this.state,
                        markers: stations,
                    });
                }
            })
            .catch(error=>{
                console.log(error);
                ToastAndroidCL('请求电站信息失败，请检查网络是否正确连接！');
            });
    };

    _toLocation = () => {
        this._navigateTo('Location', {callback: this._resetCenter});
    };

    _toList = () => {
        this._navigateTo('List', {position: currentPosition});
    };

    _showTraffic = () => {
        this.setState({
            ...this.state,
            trafficEnabled: !this.state.trafficEnabled,
        });
    };

    _resetCenter = (cityName) => {
        if (cityName !== null && cityName !== undefined) {
            this._titleBar.setState({
                ...this._titleBar.state,
                leftLabel: cityName,
            });
        }

        this._goToTheCity(cityName);
    };

    _search = () => {
        this._navigateTo('Search', {callback: this._searchCompleted});
    };

    _navigateTo = (screenKey, params)=>{
        const {nav} = this.props.screenProps;
        const {navigate} = nav;
        navigate && navigate(screenKey, params);
    };

    _searchCompleted = (station)=>{
        this._titleBar.blur();

        let {address} = station;
        this._goToTheCity(address);
    };

    _goToTheCity = (cityName)=>{
        if (cityName !== null
            && cityName !== undefined
            && cityName !== '') {
            this._getCoordinate(cityName);
        }
    };

    _getCoordinate = (text) => {
        Geolocation.geocode(text, text)
            .then(location=>{
                if (location.longitude === null || location.longitude === undefined
                    || location.latitude === null || location.latitude === undefined)
                {
                    ToastAndroidBS('无法解析该地址！');
                    return;
                }

                currentPosition = {longitude: location.longitude, latitude: location.latitude};

                this.setState({
                    ...this.state,
                    zoom: Zoom,
                    center: {
                        longitude: location.longitude,
                        latitude: location.latitude
                    }
                });
            })
            .catch(error=>{
                console.log(`cannot analyse the address, error: ${error}`);
                ToastAndroidBS('无法解析该地址！');
            });
    };

    // 扫一扫
    _onStartChargingPress = () => {
        if (AppContext.isLogon === true) {
            this._navigateTo('Scan', {headerVisible: true});
        } else {
            ToastAndroidBS('请先登录！');
            this._navigateTo('Login');
        }
    };

    // 显示电站基本信息
    _showStationBriefInfo = (e) => {
        let info = e.title.split(',');
        if (info.length <= 1) {
            prompt('信息错误！');
            return;
        }
        let id = info[0];
        // 后面可能会改成从请求过的数据直接加载，避免再次访问网络服务。
        // code here.
        getSingleStation(id)
            .then(ret=>{
                if (ret.result === true) {
                    let {data} = ret;
                    this._station.show(data.name,
                        data.numbers,
                        data.address,
                        (i)=>{
                            switch (i)
                            {
                                case 0:
                                    const {nav} = this.props.screenProps;
                                    nav && nav('Details', {station: data});
                                    break;
                                case 1:
                                    position = e.position;
                                    this._showMapSelector();
                                    break;
                                default:
                                    break;
                            }
                        });
                } else {
                    let {message} = ret;
                    ToastAndroidBS(message);
                    console.log(message);
                }
            })
            .catch(err=>{
                console.error(err);
                prompt('没有找到该电站的信息...');
            });
    };

    _showMapSelector(){
        showMapSelector(this._navigator, {start: currentPosition, end: position});
    }

    _startSubscribe = () => {
        let {station} = AppContext.subscribeData;
        this.setState({
            ...this.state,
            subscribe: true,
            countdown: 15 * 60, // 计时时间15分钟
            station: station,
        });

        this._startTimer();
    };

    _stopSubscribe = () => {
        this._stopTimer();

        AppContext.unSubscribe(AppStatus.Normal);
        this.setState({
            ...this.state,
            subscribe: false,
        });

        this._init();
    };

    _startTimer = ()=>{
        this._timer = setInterval(
            () => {
                this.setState(prevdata => {
                    return {
                        ...this.state,
                        countdown: prevdata.countdown - 1
                    };
                });

                let showtime = '';
                if (this.state.countdown <= 0){
                    showtime = formatTime(0);
                    this._stopSubscribe();
                } else {
                    showtime = formatTime(this.state.countdown);
                }

                this.setState({
                    ...this.state,
                    showtime: showtime,
                });
            },
            1000 // every 1s
        );
    };

    _stopTimer = ()=>{
        this._timer && clearInterval(this._timer);
    };

    // 取消预约
    _onCancelSubscribe = () => {
        prompt('确定要取消预约吗？', ()=>{
            this._stopSubscribe();
        });
    };

    // 导航到预约电站
    _onNavigateSubscribe = ()=>{
        let station = this.state.station;
        if (station === null || station === undefined
            || station.latitude === null || station.latitude === undefined
            || station.longitude === null || station.longitude === undefined){
            ToastAndroidBS('无法导航到这个电站！');
            return;
        }
        let destination = {longitude: station.longitude, latitude: station.latitude};
        showMapSelector(this._navigator, {start: null, end: destination});
    };

    // 开始充电
    _startCharging = ()=>{
        this.setState({
            ...this.state,
            subscribe: false,
            charging: true,
        });
    };

    // 查看充电状态
    _checkChargingStatus = ()=>{
        this._navigateTo('WaitingCharging');
    };

    _renderLocationIcon = () => {
        return (
            <View pointerEvents="box-none"
                  style={[styles.icon, styles.location, shadowStyle]}>
                <TouchableHighlight activeOpacity={0.6}
                                    style={[styles.iconContainer]}
                                    onPress={this._currentLocation}
                                    underlayColor={colors.grey4} >
                    <Icon name="md-locate"
                          size={20} color={colors.grey3} />
                </TouchableHighlight>
            </View>
        );
    };

    _renderTrafficIcon = () => {
        return (
            <View pointerEvents="box-none"
                  style={[styles.icon, styles.traffic, shadowStyle]}>
                <TouchableHighlight activeOpacity={0.6}
                                    style={[styles.iconContainer]}
                                    onPress={this._showTraffic}
                                    underlayColor={colors.grey4}>
                    <MaterialIcon name="traffic" size={20}
                                  color={this.state.trafficEnabled ? colors.secondary2 : colors.grey3}/>
                </TouchableHighlight>
            </View>
        );
    };

    _renderRefreshStationsIcon = ()=> {
        return (
            <View pointerEvents="box-none"
                  style={[styles.icon, styles.refresh, shadowStyle]}>
                <TouchableHighlight activeOpacity={0.6}
                                    style={[styles.iconContainer]}
                                    onPress={this._requestStations}
                                    underlayColor={colors.grey4}>
                    <MaterialIcon name="refresh" size={20}
                                  color={colors.grey3}/>
                </TouchableHighlight>
            </View>
        );
    };

    _renderWaitingSubscribeBanner = ()=> {
        return (
            <View pointerEvents='box-none'
                  style={[styles.banner, shadowStyle]}>
                <View style={styles.bannerContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleLeftContainer}>
                            <Text style={[styles.bannerTitle, styles.bannerTextColor]}
                                  numberOfLines={1}>
                                {this.state.station && this.state.station.name}
                            </Text>
                            <Text style={[styles.bannerAddress, styles.bannerTextColor]}
                                  numberOfLines={1}>
                                {this.state.station && this.state.station.address}
                            </Text>
                        </View>

                        <View style={styles.titleRightContainer}>
                            <TouchableOpacity activeOpacity={0.6}
                                              style={styles.button}
                                              onPress={this._onNavigateSubscribe}>
                                <Icon name="md-navigate" size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}
                                              style={styles.button}
                                              onPress={this._onCancelSubscribe}>
                                <Icon name="md-close" size={20} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DividerLine style={styles.divider}/>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.time, styles.bannerTextColor]}>
                            {this.state.showtime || '14分钟59秒'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    _renderWaitingChargingBanner = ()=>{
        return (
            <View pointerEvents='box-none'
                  style={[styles.chargingBanner, shadowStyle]}>
                <View style={styles.chargingInfoLeftContainer}>
                    <Text style={[styles.chargingBannerText, styles.bannerTextColor]}>
                        您的爱车正在充电，可查看充电状态。
                    </Text>
                </View>
                <TouchableOpacity style={styles.chargingInfoRightContainer}
                                  activeOpacity={0.6}
                                  onPress={this._checkChargingStatus}>
                    <Icon name="md-arrow-forward" size={18} color={colors.white} />
                </TouchableOpacity>
            </View>
        );
    };

    _renderMapView = () => {
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
                    onMapLoaded={this._currentLocation}
                >
                </MapView>

                {
                    this.state.charging ?
                        null
                        : <CPAScanButton onPress={this._onStartChargingPress}/>
                }

                {
                    this._renderLocationIcon()
                }
                {
                    this._renderTrafficIcon()
                }
                {
                    this.state.subscribe ?
                        this._renderWaitingSubscribeBanner()
                        : null
                }
                {
                    this.state.charging ?
                        this._renderWaitingChargingBanner()
                        : null
                }
                {
                    this.state.markers.length <= 0 && !this.state.subscribe && !this.state.charging ?
                        this._renderRefreshStationsIcon()
                        : null
                }
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <DefinedTitleBar ref={self=>this._titleBar=self}
                                 toLocation={this._toLocation}
                                 toList={this._toList}
                                 search={this._search}
                                 rightLabel="附近"
                                 disableRightLabel={this.state.subscribe || this.state.charging}
                                 icon={<SimpleIcon type={icons.SimpleLineIcon} name="arrow-down" color={colors.white} size={14} />} />

                {
                    this._renderMapView()
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