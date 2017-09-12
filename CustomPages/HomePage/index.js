import React, {Component} from 'react';
import {View, Button, Modal} from 'react-native';

import styles from './styles';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import {gotoNavigation, mapApp, prompt2, whichMapApp} from "../../Common/functions";
import {AlertSelected} from "../../CustomComponents/AlertSelected/index";
import {AlertStationBriefInfo} from "../../CustomComponents/AlertStationBriefInfo/index";

const selectedArr = [{key:1, title:"百度地图"}, {key:2, title:"高德地图"}];
let position = null;

class CPAHomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 116.2499720000,
                latitude: 40.0885740000
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [
                {
                    longitude: 116.2499720000,
                    latitude: 40.0885740000,
                    title: '加速器一区充电站',
                    address: '北京市海淀区永丰产业基地加速器一区充电站',
                    id: 1,
                }
            ],
            hide: true,
        };
    }

    _toLocation = () => {
        const {nav} = this.props.screenProps;
        nav && nav('Location');
    };

    _toList = () => {
        const {nav} = this.props.screenProps;
        nav && nav('List');
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
    _showStationBasicInfo = (e) => {
        this._station.show(e.title,
            '1/2',
            '北京市海淀区永丰产业基地加速器一区',
            (i)=>{
                switch (i)
                {
                    case 0:
                        const {nav} = this.props.screenProps;
                        nav && nav('Details');
                        break;
                    case 1:
                        /*const {nav} = this.props.screenProps;
                        nav && nav('MapNav');*/

                        position = e.position;
                        this.showAlertSelected();
                        break;
                    default:
                        break;
                }
            });
    };

    showAlertSelected(){
        this._dialog.show("请选择导航地图", selectedArr, '#333333', this.callbackSelected);
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
            gotoNavigation(theMap,
                {"longitude":116.388236, "latitude": 40.106099},
                position,
                (succeed, msg)=>{
                    alert(msg);
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <DefinedTitleBar toLocation={this._toLocation}
                                 toList={this._toList}
                                 search={this._search} />

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
                        onMarkerClick={(e) => {this._showStationBasicInfo(e)}}
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

                <AlertStationBriefInfo ref={self=>{
                    this._station = self;
                }}/>

                <AlertSelected ref={(dialog)=>{
                    this._dialog = dialog;
                }} />
            </View>
        );
    }
}

export default CPAHomePage;