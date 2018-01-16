export const STAT_CACHE_COMPLETED_ACTION = 'STAT_CACHE_COMPLETED';
export const CLEAR_CACHE_COMPLETED_ACTION = 'CLEAR_CACHE_COMPLETED';
export const CHECK_VERSION_COMPLETED_ACTION = 'CHECK_VERSION_COMPLETED_ACTION';
export const MESSAGE_NOTICE_SWITCH_ACTION = 'MESSAGE_NOTICE_SWITCH';


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