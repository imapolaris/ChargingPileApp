import {
    clearCollectStations, getChargingPiles, getCollectStations,
    getNearbyStations,
    getStationDetails, stationCollectState
} from "../common/webapi";
import {ToastBS} from "../common/functions";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {doNav} from "./navactions";
import {ScreenKey} from "../common/constants";

export const QUERY_NEARBY_STATIONS_ACTION = 'QUERY_NEARBY_STATIONS';

export function doQueryNearbyStations() {
    return (dispatch, getState) => {
        dispatch(startRequestWeb());
        const {currentPos} = getState().map;
        return getNearbyStations(currentPos)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret && ret.length>0)
                    return ret.map((item, index)=>Object.assign({}, item, {key: index}));
                else
                    return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}

export function doSelectOneStation(station) {
    return dispatch => {
        const {id} = station;
        dispatch(doNav(ScreenKey.StationInfo, {stationId: id}))
    }
}

export function doQueryStationDetailInfo(stationId) {
    return (dispatch, getState) => {
        const {userId} = getState().user;
        return getStationDetails(userId, stationId)
            .then(ret=>{
                if (ret.result)
                    return ret.data;
                else
                    ToastBS(ret.message);
            })
            .catch(err=>{
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}

export function doQueryStationChargingPiles(stationId) {
    return dispatch => {
        dispatch(startRequestWeb());
        return getChargingPiles(stationId)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret && ret.length>0)
                    return ret.map((item, index)=>Object.assign({}, item, {key: index}));
                else
                    return [];
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

export function doQueryCollectStations() {
    return (dispatch, getState) => {
        dispatch(startRequestWeb());
        const {userId} = getState().user;
        return getCollectStations(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret && ret.length>0)
                    return ret.map((item, index)=>Object.assign({}, item, {key: index}));
                else
                    return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}

export function doStationCollectStateChanged(stationId){
    return (dispatch, getState) => {
        const {logined} = getState().user;
        if (!logined) {
            ToastBS('请先登录！');
            dispatch(doNav(ScreenKey.Login));
            return new Promise((resolve, reject) => {
                reject(false);
            });
        }

        const {userId} = getState().user;
        return stationCollectState(userId, stationId)
            .then(ret=>{
                ToastBS(ret.message);
                return true;
            })
            .catch(err=>{
                ToastBS(`${err}`);
                console.log(err);
                return false;
            })
    }
}

export function doClearCollectStations() {
    return (dispatch, getState) => {
        const {userId} = getState().user;
        return clearCollectStations(userId)
            .then(ret=>{
                return ret.result;
            })
            .catch(err=>{
                console.log(err);
                ToastBS(`${err}`);
                return false;
            })
    }
}