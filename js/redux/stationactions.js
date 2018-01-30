import {getChargingPiles, getCollectStations, getNearbyStations, getStationDetails} from "../common/webapi";
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
                ToastBS(`error: ${err}`);
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
    return dispatch => {
        return getStationDetails(stationId)
            .then(ret=>{
                if (ret.result)
                    return ret.data;
                else
                    ToastBS(ret.message);
            })
            .catch(err=>{
                console.log(err);
                ToastBS(`error: ${err}`);
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
                    return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`error: ${err}`);
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