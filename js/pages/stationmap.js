'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import CPASearchBar from "../components/searchbar";
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import colors from "../common/colors";
import {ScreenKey} from "../common/constants";
import ActionButton from "../components/actionbutton";
import {IconType} from "../common/icons";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";
import {doEnableTraffic, getCurrentPosition, doRequestStationMarkers, doRequestOneStationInfo} from "../redux/actions";
import {MapSelector, StationSelector} from "../components/selector";


class CPAStationMapPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showStation: false,
        };
    }

    componentDidMount() {
        const {requestStationMarkers} = this.props;
        requestStationMarkers && requestStationMarkers();
    }

    _navigateTo = (screenKey) => {
        const {navigate} = this.props.navigation;
        navigate && navigate(screenKey);
    };

    _renderMapView = () => {
        const {trafficEnabled, currentLocation, enableTraffic,
                requestStationMarkers, requestOneStationInfo,
                station, markers, isRefreshing} = this.props;
        const {showStation} = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    {...this.props}
                    style={styles.map}
                    onMarkerClick={(e) => { requestOneStationInfo(e);this.setState({showStation:true}); }}
                    onMapClick={(e) => {}}
                    onMapLoaded={currentLocation} />

                <ActionButton icon={<Icon type={IconType.MaterialIcon} name="traffic" size={25} color={trafficEnabled ? colors.limegreen : colors.grey3}/>}
                                 onAction={enableTraffic} text="路况" position={styles.trafficButton} />
                <ActionButton icon={<Icon type={IconType.Ionicon} name="md-heart" size={25} color={colors.red}/>}
                                 onAction={()=>this._navigateTo(ScreenKey.Collect)} text="收藏" position={styles.collectButton} />
                {/*<ActionButton icon={<Icon type={IconType.Ionicon} name="md-funnel" size={25} color={colors.primary} />}
                                 onAction={()=>this._navigateTo(ScreenKey.Filter)} text="筛选" position={styles.filterButton} />*/}

                <ActionButton icon={<Icon type={IconType.Ionicon} name="md-locate" size={25} color={colors.grey3}/>}
                                 onAction={currentLocation} showText={false} position={styles.locateButton}
                                 containerStyle={styles.actionButtonContainer} btnStyle={styles.actionButtonStyle} />
                <ActionButton icon={<Icon type={IconType.Ionicon} name="md-help" size={25} color={colors.grey3}/>}
                                 onAction={()=>{}} showText={false} position={styles.questionButton}
                                 containerStyle={styles.actionButtonContainer} btnStyle={styles.actionButtonStyle} />

                {
                    !isRefreshing && markers.length <= 0 ?
                        <ActionButton icon={<Icon type={IconType.Ionicon} name="md-refresh" size={25} color={colors.grey3}/>}
                                         onAction={()=>requestStationMarkers()} showText={false} position={styles.refreshButton}
                                         containerStyle={styles.actionButtonContainer} btnStyle={styles.actionButtonStyle} />
                        : null
                }

                {/*<MapSelector visible={true} from={{longitude: 116.404185, // 中间点坐标
                    latitude: 39.91491}} to={{longitude: 116.404185, // 中间点坐标
                    latitude: 40.01}} />*/}

                {/*<StationSelector visible={showStation} station={station} onAction={()=>{}} />*/}
            </View>
        );
    };

    render() {
        const {city} = this.props;

        return (
            <View style={styles.container}>
                <CPASearchBar leftButtonLabel={city}
                              onSearch={()=>this._navigateTo(ScreenKey.SearchStation)}
                              navToLocatingCity={()=>this._navigateTo(ScreenKey.LocatingCity)}
                              navToStationList={()=>this._navigateTo(ScreenKey.StationList)} />

                {
                    this._renderMapView()
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        zoomControlsVisible: state.map.zoomControlsVisible,
        trafficEnabled: state.map.trafficEnabled,
        baiduHeatMapEnabled: state.map.baiduHeatMapEnabled,
        zoom: state.map.zoom,
        mapType: state.map.mapType,
        center: state.map.center,
        markers: state.map.markers,
        station: state.map.station,
        isRefreshing: state.map.isRefreshing,
        city: state.map.city,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currentLocation: () => dispatch(getCurrentPosition()),
        enableTraffic: () => dispatch(doEnableTraffic()),
        requestStationMarkers: () => dispatch(doRequestStationMarkers()),
        requestOneStationInfo: (e) => dispatch(doRequestOneStationInfo(e)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CPAStationMapPage);

const Size = 39;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    map: {
        flex: 1,
    },
    actionButtonContainer: {
        height: 35,
        width: 35,
    },
    actionButtonStyle: {
        borderRadius: 35/2,
    },
    filterButton: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 120,
    },
    collectButton: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 70,
    },
    trafficButton: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 20,
    },
    locateButton: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        bottom: 20,
        left: 10,
        right: 0,
        top: 0,
    },
    questionButton: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        bottom: 65,
        left: 10,
        right: 0,
        top: 0,
    },
    refreshButton: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        bottom: 110,
        left: 10,
        right: 0,
        top: 0,
    }
});