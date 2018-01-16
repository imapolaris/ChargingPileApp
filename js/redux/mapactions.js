import {getAllStationsWithBriefInfo, getSingleStation} from "../common/webapi";
import {Geolocation} from 'react-native-baidu-map';

export const LOCATING_ACTION = 'LOCATING'; // 定位
export const GEOCODE_COMPLETED_ACTION = 'GEOCODE_COMPLETED'; // 地理编码
export const CHOOSE_CITY_COMPLETED_ACTION = 'CHOOSE_CITY_COMPLETED'; // 选择定位城市
export const ENABLE_TRAFFIC_ACTION = 'ENABLE_TRAFFIC'; // 显示路况信息
export const START_REQUEST_STATION_MARKERS_ACTION = 'START_REQUEST_STATION_MARKERS'; // 开始请求电站地图标识
export const ERROR_REQUEST_STATION_MARKERS_ACTION = 'ERROR_REQUEST_STATION_MARKERS'; // 请求电站地图标识报错
export const RECEIVE_STATION_MARKERS_ACTION = 'RECEIVE_STATION_MARKERS'; // 电站地图标识
export const RECEIVE_ONE_STATION_INFO_ACTION = 'RECEIVE_ONE_STATION_INFO'; // 一个电站


function doLocating(position) {
    return {
        type: LOCATING_ACTION,
        position
    };
}

export function getCurrentPosition() {
    return dispatch => Geolocation.getCurrentPosition()
        .then(data=>{
                dispatch(doLocating(data));
            },
            error=>{
                throw new Error(error);
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
        //dispatch(startRequestWeb());

        Geolocation.geocode(city, city)
            .then(position => {
                //dispatch(completeRequestWeb());

                if (position !== null && position !== undefined) {
                    //ToastAndroidBS('无法解析该地址！');
                    dispatch(geocodeCompleted({
                        longitude: position.longitude,
                        latitude: position.latitude,
                        city: city,
                    }));
                }
            })
            .catch(error => {
                console.log(`cannot analyse the address, error: ${error}`);
                //ToastAndroidBS('无法解析该地址！');

                //dispatch(completeRequestWeb());
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
                throw new Error(error);
            });
    }
}

function receiveOneStationInfo(station) {
    return {
        type: RECEIVE_ONE_STATION_INFO_ACTION,
        station
    }
}

export function doRequestOneStationInfo(e) {
    if (e === null || e === undefined) return;

    let info = e.title.split(',');
    if (info.length <= 1) {
        //prompt('信息错误！');
        return;
    }
    let id = info[0];

    return dispatch => {
        //dispatch(startRequestWeb());
        return getSingleStation(id)
            .then(data=>{
                //dispatch(completeRequestWeb());

                dispatch(receiveOneStationInfo(data));

                return data;
            })
            .catch(error=>{
                //dispatch(completeRequestWeb());
                console.log(error);
                throw new Error(error);
            });
    }
}