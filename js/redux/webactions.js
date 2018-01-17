export const START_REQUEST_WEB_ACTION = 'START_REQUEST_WEB';
export const COMPLETE_REQUEST_WEB_ACTION = 'COMPLETE_REQUEST_WEB';

export function startRequestWeb() {
    return {
        type: START_REQUEST_WEB_ACTION,
    };
}

export function completeRequestWeb() {
    return {
        type: COMPLETE_REQUEST_WEB_ACTION,
    };
}