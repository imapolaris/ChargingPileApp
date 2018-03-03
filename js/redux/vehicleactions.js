import {completeRequestWeb, startRequestWeb} from "./webactions";
import {addOneVehicle, delOneVehicle, getVehicleInfo} from "../common/webapi";
import {ToastBS} from "../common/functions";
import {doBack} from "./navactions";

export const QUERY_VEHICLE_INFO_ACTION = 'QUERY_VEHICLE_INFO';
export const DEL_ONE_VEHICLE_ACTION = 'DEL_ONE_VEHICLE';
export const ADD_ONE_VEHICLE_ACTION = 'ADD_ONE_VEHICLE';

export function doQueryVehicleInfo() {
    return (dispatch, getState) => {
        /*const {vehicles} = getState().vehicle;
        if (vehicles && vehicles.length > 0)
            return vehicles;*/

        const {userId} = getState().user;
        dispatch(startRequestWeb());
        return getVehicleInfo(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());

                let data;
                if (ret && ret.length>0)
                    data = ret.map((item, index)=>Object.assign({}, item, {key: index}));
                else
                    data = ret;
                dispatch({
                    type: QUERY_VEHICLE_INFO_ACTION,
                    data
                });
                return data;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

export function doDelOneVehicle(vehicleId) {
    return dispatch => {
        dispatch(startRequestWeb('正在删除...'));
        delOneVehicle(vehicleId)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    ToastBS('删除成功！');

                    dispatch({
                        type: DEL_ONE_VEHICLE_ACTION,
                        vehicleId
                    });
                } else {
                    ToastBS(ret.message);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            });
    }
}

export function doAddOneVehicle(models, plateno) {
    return (dispatch, getState) => {
        dispatch(startRequestWeb('正在提交...'));

        const {userId} = getState().user;
        addOneVehicle(userId, models, plateno)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    ToastBS('添加成功！');

                    dispatch({
                        type: ADD_ONE_VEHICLE_ACTION,
                        vehicle : ret.data,
                    });
                    dispatch(doBack());
                } else {
                    ToastBS(ret.message);
                }
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                console.log(err);
                ToastBS(`${err}`);
            })
    }
}