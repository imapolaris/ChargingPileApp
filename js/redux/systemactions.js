import {completeRequestWeb, startRequestWeb} from "./webactions";
import {submitFeedback} from "../common/webapi";
import {ToastBS} from "../common/functions";
import {doBack} from "./navactions";

export const STAT_CACHE_COMPLETED_ACTION = 'STAT_CACHE_COMPLETED'; // 统计系统缓存
export const CLEAR_CACHE_COMPLETED_ACTION = 'CLEAR_CACHE_COMPLETED';// 清除缓存完成
export const CHECK_VERSION_COMPLETED_ACTION = 'CHECK_VERSION_COMPLETED_ACTION';// 检查软件版本
export const MESSAGE_NOTICE_SWITCH_ACTION = 'MESSAGE_NOTICE_SWITCH';// 新消息提醒开关


export function doSwitchMessageNotice(notice) {
    return dispatch => {
        dispatch({
            type: MESSAGE_NOTICE_SWITCH_ACTION,
            notice
        });
    }
}

function statCacheCompleted(cache) {
    return {
        type: STAT_CACHE_COMPLETED_ACTION,
        cache
    };
}

export function doStatCache() {

}

function clearCacheCompleted() {
    return {
        type: CLEAR_CACHE_COMPLETED_ACTION,
    };
}

export function doClearCache() {

}

function checkVersionCompleted(version) {
    return {
        type: CHECK_VERSION_COMPLETED_ACTION,
        version
    };
}

export function doCheckVersion() {

}

export function doSubmitFeedback(content, datetime) {
    return (dispatch, getState) => {
        const {userId} = getState().user;

        dispatch(startRequestWeb('正在提交...'));
        submitFeedback(userId, content, datetime)
            .then(ret=>{
                dispatch(completeRequestWeb());

                if (ret.result) {
                    ToastBS('提交成功！');
                    dispatch(doBack());
                } else {
                    ToastBS(ret.message);
                }
            })
            .catch(err=>{
                console.log(err);
                ToastBS(`${err}`);
                dispatch(completeRequestWeb());
            })
    }
}