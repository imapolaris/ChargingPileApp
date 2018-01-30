import {MapTypes} from 'react-native-baidu-map';
import {
    CHOOSE_CITY_COMPLETED_ACTION,
    ENABLE_TRAFFIC_ACTION, ERROR_REQUEST_STATION_MARKERS_ACTION, GEOCODE_COMPLETED_ACTION, LOCATING_ACTION,
    MAP_NAVIGATION_ACTION,
    RECEIVE_ONE_STATION_INFO_ACTION,
    RECEIVE_STATION_MARKERS_ACTION, START_REQUEST_STATION_MARKERS_ACTION
} from "./mapactions";

export function map(state={
    mapType: MapTypes.NORMAL,
    zoom: 13,
    center: {
        longitude: 116.404185, // 中间点坐标
        latitude: 39.91491,
    },
    trafficEnabled: false,
    baiduHeatMapEnabled: false,
    zoomControlsVisible: false,
    markers: [],
    currentPos: {
        longitude: 116.404185, // 当前坐标
        latitude: 39.91491,
    },
    isRefreshing: false,
    city: '北京',
    locatingCity: '',
}, action) {
    switch (action.type) {
        case LOCATING_ACTION:
            return Object.assign({}, state,
                {
                    center: {longitude: action.position.longitude, latitude: action.position.latitude},
                    currentPos: {longitude: action.position.longitude, latitude: action.position.latitude},
                    locatingCity: action.position.city,
                });
        case GEOCODE_COMPLETED_ACTION:
            return Object.assign({}, state,
                {
                    center: {longitude: action.position.longitude, latitude: action.position.latitude},
                    currentPos: {longitude: action.position.longitude, latitude: action.position.latitude},
                });
        case CHOOSE_CITY_COMPLETED_ACTION:
            return Object.assign({}, state, {city: action.city});
        case ENABLE_TRAFFIC_ACTION:
            return Object.assign({}, state, {trafficEnabled: !state.trafficEnabled});
        case START_REQUEST_STATION_MARKERS_ACTION:
            return Object.assign({}, state, {isRefreshing: true});
        case RECEIVE_STATION_MARKERS_ACTION:
            return Object.assign({}, state, {markers: action.stations, isRefreshing: false});
        case ERROR_REQUEST_STATION_MARKERS_ACTION:
            return Object.assign({}, state, {isRefreshing: false});
        default:
            return state;
    }
}

