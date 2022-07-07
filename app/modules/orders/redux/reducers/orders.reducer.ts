import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Order } from "../../../../common/entities/order.entity";
import * as Types from "../types/order.types";

const initialState: MultipleEntitiesStateInterface<Order> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const ordersReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Order> => {
    switch (action.type) {
        case Types.GET_ORDERS:
            console.log("in get orders");
            return { ...state, fetchState: ActionState.inProgress };
        case Types.GET_ORDERS_SUCCESS:
            console.log("in get orders success");
            return {
                ...state,
                fetchState: ActionState.done,
                entities: action.payload.data,
            };
        case Types.GET_ORDERS_FAIL:
            return { ...state, fetchState: ActionState.failed };
        default:
            return state;
    }
};
