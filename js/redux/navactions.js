import {ScreenKey} from "../common/constants";
import {NavigationActions} from "react-navigation";

export function doNav(screenKey) {
    return (dispatch, getState) => {
        switch (screenKey) {
            case ScreenKey.PersonalInfo:
            case ScreenKey.MyMessage:
            case ScreenKey.Wallet:
            case ScreenKey.BillingRecords:
            case ScreenKey.Collect:
            case ScreenKey.MySubscribe:
            case ScreenKey.TestingReport:
            case ScreenKey.Scan:
                const {logined} = getState().user;
                if (logined) {
                    dispatch(NavigationActions.navigate({routeName: screenKey}));
                } else {
                    dispatch(NavigationActions.navigate({routeName: ScreenKey.Login}))
                }
                break;
            default:
                dispatch(NavigationActions.navigate({routeName: screenKey}));
        }
    };
}

export function doBack(key) {
    return dispatch => {
        if (key !== null) {
            dispatch(NavigationActions.back({key}))
        } else {
            dispatch(NavigationActions.back());
        }
    }
}