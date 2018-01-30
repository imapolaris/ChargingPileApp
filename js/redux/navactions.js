import {ScreenKey} from "../common/constants";
import {NavigationActions} from "react-navigation";
import {ToastBL} from "../common/functions";

export const GO_BACK_ACTION = 'GO_BACK';
export const START_IN_CHARGING_ACTION = 'START_IN_CHARGING';

let debounce = true;
export function doNav(screenKey, params) {
    return (dispatch, getState) => {
        if (debounce) {
            debounce = false;
            setTimeout(
                () => {
                    debounce = true;
                },
                3000,
            );
            switch (screenKey) {
                case ScreenKey.PersonalInfo:
                case ScreenKey.MyMessage:
                case ScreenKey.Wallet:
                case ScreenKey.BillingRecords:
                case ScreenKey.Collect:
                case ScreenKey.MySubscribe:
                case ScreenKey.TestingReport:
                case ScreenKey.Scan:
                case ScreenKey.VehicleInfo:
                    const {logined} = getState().user;
                    if (logined) {
                        dispatch(NavigationActions.navigate({routeName: screenKey, params}));
                    } else {
                        if (screenKey !== ScreenKey.PersonalInfo)
                            ToastBL('请先登录！');
                        dispatch(NavigationActions.navigate({routeName: ScreenKey.Login}))
                    }
                    break;
                default:
                    dispatch(NavigationActions.navigate({routeName: screenKey, params}));
            }
        }
    }
}

export function doBack(screenKey) {
    return dispatch => {
        if (screenKey) {
            dispatch({
                type: GO_BACK_ACTION,
                screenKey,
            });
        } else {
            dispatch(NavigationActions.back());
        }
    }
}

export function doLoadHomePage() {
    return dispatch => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: ScreenKey.Home})
            ]
        });
        dispatch(resetAction);
    }
}

export function doLoadInChargingPage() {
    return dispatch => {
        dispatch({
            type: START_IN_CHARGING_ACTION,
        });
    }
}