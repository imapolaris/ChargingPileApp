import {getAllStationsWithBriefInfo, getSingleStation} from "../common/webapi";
import {Geolocation} from 'react-native-baidu-map';
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {ToastBS} from "../common/functions";
import {doBack} from "./navactions";

export const LOCATING_ACTION = 'LOCATING'; // 定位
export const GEOCODE_COMPLETED_ACTION = 'GEOCODE_COMPLETED'; // 地理编码
export const CHOOSE_CITY_COMPLETED_ACTION = 'CHOOSE_CITY_COMPLETED'; // 选择定位城市
export const ENABLE_TRAFFIC_ACTION = 'ENABLE_TRAFFIC'; // 显示路况信息
export const START_REQUEST_STATION_MARKERS_ACTION = 'START_REQUEST_STATION_MARKERS'; // 开始请求电站地图标识
export const ERROR_REQUEST_STATION_MARKERS_ACTION = 'ERROR_REQUEST_STATION_MARKERS'; // 请求电站地图标识报错
export const RECEIVE_STATION_MARKERS_ACTION = 'RECEIVE_STATION_MARKERS'; // 电站地图标识


function doLocating(position) {
    return {
        type: LOCATING_ACTION,
        position
    };
}

export function getCurrentPosition() {
    return dispatch => Geolocation.getCurrentPosition()
        .then(data => {
            dispatch(doLocating(data));
        })
        .catch(err => {
            ToastBS(`error: ${err}`);
        });
}

function geocodeCompleted(position){
    return {
        type: GEOCODE_COMPLETED_ACTION,
        position,
    }
}

export function doGeocode(city) {
    return dispatch => {
        dispatch(startRequestWeb());

        Geolocation.geocode(city, city)
            .then(position => {
                dispatch(completeRequestWeb());

                const {longitude, latitude} = position;
                if ((longitude !== null && longitude !== undefined)
                        && (latitude !== null && latitude !== undefined)) {
                    dispatch(geocodeCompleted({
                        longitude: longitude,
                        latitude: latitude,
                        city: city,
                    }));
                } else {
                    ToastBS('无法解析该地址！');
                }
            })
            .catch(error => {
                dispatch(completeRequestWeb());
                console.log(`error: ${error}`);
                ToastBS(`error: ${error}`);
            });
    }
}

function chooseCityCompleted(city) {
    return {
        type: CHOOSE_CITY_COMPLETED_ACTION,
        city,
    }
}

export function doChooseCity(city) {
    return dispatch => {
        dispatch(chooseCityCompleted(city));

        dispatch(doGeocode(city));
        dispatch(doBack());
    }
}

export function doEnableTraffic() {
    return {
        type: ENABLE_TRAFFIC_ACTION,
    };
}

function startRequestStationMarkers(){
    return {
        type: START_REQUEST_STATION_MARKERS_ACTION,
    };
}

function errorRequestStationMarkers(){
    return {
        type: ERROR_REQUEST_STATION_MARKERS_ACTION,
    };
}

function receiveStationMarkers(stations) {
    return {
        type: RECEIVE_STATION_MARKERS_ACTION,
        stations
    };
}

export function doRequestStationMarkers(filter) {
    return dispatch => {
        dispatch(startRequestStationMarkers());
        getAllStationsWithBriefInfo(filter)
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

                    dispatch(receiveStationMarkers(stations));
                }
            })
            .catch(error=>{
                dispatch(errorRequestStationMarkers());
                console.log(error);
                ToastBS(`error: ${error}`);
            });
    }
}

export function doRequestOneStationInfo(e) {
    if (e === null || e === undefined) return;

    let info = e.title.split(',');
    if (info.length <= 1) {
        ToastBS('无法请求该电站信息！');
        return;
    }
    let id = info[0];

    return dispatch => {
        dispatch(startRequestWeb());
        return getSingleStation(id)
            .then(data=>{
                dispatch(completeRequestWeb());

                return data;
            })
            .catch(error=>{
                dispatch(completeRequestWeb());
                console.log(error);
                ToastBS(`error: ${error}`);
            });
    }
}