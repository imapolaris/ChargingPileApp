import {ADD_ONE_VEHICLE_ACTION, DEL_ONE_VEHICLE_ACTION, QUERY_VEHICLE_INFO_ACTION} from "./vehicleactions";

export function vehicle(state={
    defaultVehicle: '1',
    vehicles: [],
}, action) {
    switch (action.type) {
        case QUERY_VEHICLE_INFO_ACTION:
        return Object.assign({}, state, {vehicles: action.data});
        case DEL_ONE_VEHICLE_ACTION:
        {
            let index = state.vehicles.findIndex((item)=>item.id === action.vehicleId);
            return Object.assign({}, state, {
                vehicles: [...state.vehicles.slice(0, index), ...state.vehicles.slice(index+1)],
            });
        }
        case ADD_ONE_VEHICLE_ACTION:
            let vehicles = Object.assign([], state.vehicles);
            vehicles.push(action.vehicle);
            return Object.assign({}, state, {vehicles: [...vehicles]});
        default:
            return state;
    }
}