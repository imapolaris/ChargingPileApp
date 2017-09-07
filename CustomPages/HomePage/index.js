import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

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
                    title: "北京市海淀区永丰产业基地加速器一区充电站"
                }
            ],
            marker: {
                longitude: 116.2499720000,
                latitude: 40.0885740000,
                title: "北京市海淀区永丰产业基地加速器一区充电站"
            }
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
                        onMarkerClick={(e) => {
                            /*console.warn(JSON.stringify(e));*/
                            alert(JSON.stringify(e));
                        }}
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
            </View>
        );
    }
}

export default CPAHomePage;