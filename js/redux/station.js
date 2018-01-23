import {QUERY_NEARBY_STATIONS_ACTION} from "./stationactions";

export function station(state={
    stations: [],
}, action) {
    switch (action.type) {
        case QUERY_NEARBY_STATIONS_ACTION:
            return Object.assign({}, state, {stations: action.stations});
        default:
            return state;
    }
}