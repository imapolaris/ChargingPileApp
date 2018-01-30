export const START_REQUEST_WEB_ACTION = 'START_REQUEST_WEB';
export const COMPLETE_REQUEST_WEB_ACTION = 'COMPLETE_REQUEST_WEB';

export function startRequestWeb(label) {
    return {
        type: START_REQUEST_WEB_ACTION,
        label
    };
}

export function completeRequestWeb() {
    return {
        type: COMPLETE_REQUEST_WEB_ACTION,
    };
}