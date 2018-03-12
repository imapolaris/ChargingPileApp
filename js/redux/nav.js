import Routers from '../components/navigators';
import {GO_BACK_ACTION, SHOW_CHARGING_BILLING_ACTION, START_IN_CHARGING_ACTION} from "./navactions";
import {StateUtils} from 'react-navigation';
import {ScreenKey} from "../common/constants";

export function nav(state, action) {
    let nextState = null;
    switch (action.type) {
        case GO_BACK_ACTION:
        {
            let backRouteIndex = null;
            const backRoute = state.routes.find(route=>route.routeName === action.screenKey);
            console.log('backRoute ======', backRoute);
            backRouteIndex = state.routes.indexOf(backRoute);
            console.log('backRoute ======', backRouteIndex);

            if (backRouteIndex >= 0) {
                return {
                    ...state,
                    routes: state.routes.slice(0, backRouteIndex+1),
                    index: backRouteIndex,
                };
            } else {
                return StateUtils.pop(state);
            }
        }
            break;
        case START_IN_CHARGING_ACTION:
            return StateUtils.replaceAtIndex(state, state.index, {routeName: ScreenKey.InCharging});
        case SHOW_CHARGING_BILLING_ACTION:
            return StateUtils.replaceAtIndex(state, state.index, {routeName: ScreenKey.ChargingBilling});
        default:
            nextState = Routers.router.getStateForAction(action, state);
    }


    return nextState || state;
}