import {completeRequestWeb, startRequestWeb} from "./webactions";
import {getMyMessages} from "../common/webapi";
import {ToastBS} from "../common/functions";

export const QUERY_MY_MESSAGES_ACTION = 'QUERY_MY_MESSAGES';

export function doQueryMyMessages() {
    return (dispatch, getState) => {
        const {userId} = getState().user;
        dispatch(startRequestWeb());
        return getMyMessages(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            });
    }
}