import {MapTypes} from 'react-native-baidu-map';
import {LOCATING_ACTION} from "./actions";

export function map(state={
    mapType: MapTypes.NORMAL,
    zoom: 15,
    center: {
        longitude: 116.404185, // 中间点坐标
        latitude: 39.91491,
    },
    trafficEnabled: false,
    baiduHeatMapEnabled: false,
    zoomControlsVisible: false,
    markers: [],
    currentPos: {
        longitude: 116.404185, // 中间点坐标
        latitude: 39.91491,
    }
}, action) {
    switch (action.type) {
        case LOCATING_ACTION:
            return Object.assign({}, state,
                {
                    center: {longitude: action.data.longitude, latitude: action.data.latitude},
                    currentPos: {longitude: action.data.longitude, latitude: action.data.latitude},
                });
        default:
            return state;
    }
}

