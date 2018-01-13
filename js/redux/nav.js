import Routers from '../components/navigators';

export function nav(state, action) {
    let nextState = Routers.router.getStateForAction(action, state);
    return nextState || state;
}