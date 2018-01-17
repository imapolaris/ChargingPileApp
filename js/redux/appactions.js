export const ON_APP_STATUS_CHANGED_ACTION = 'ON_APP_STATUS_CHANGED';

export function doChangeAppStatus(status) {
    return dispatch => {
        dispatch({
            type: ON_APP_STATUS_CHANGED_ACTION,
            status,
        });
    }
}