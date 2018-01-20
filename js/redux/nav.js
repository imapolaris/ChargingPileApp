import Routers from '../components/navigators';
import {GO_BACK_ACTION} from "./navactions";
import {StateUtils} from 'react-navigation';

export function nav(state, action) {
    console.log(action);
    console.log(state);

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
        default:
            nextState = Routers.router.getStateForAction(action, state);
    }


    return nextState || state;
}