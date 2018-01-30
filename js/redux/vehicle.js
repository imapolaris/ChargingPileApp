import {ADD_ONE_VEHICLE_ACTION, DEL_ONE_VEHICLE_ACTION, QUERY_VEHICLE_INFO_ACTION} from "./vehicleactions";

export function vehicle(state={
    defaultVehicle: '1',
    vehicles: [],
}, action) {
    switch (action.type) {
        case QUERY_VEHICLE_INFO_ACTION:
            return Object.assign({}, state);
        case DEL_ONE_VEHICLE_ACTION:
            return Object.assign({}, state);
        case ADD_ONE_VEHICLE_ACTION:
            return Object.assign({}, state);
        default:
            return state;
    }
}