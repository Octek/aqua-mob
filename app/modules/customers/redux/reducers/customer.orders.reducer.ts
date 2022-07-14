import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Order } from "../../../../common/entities/order.entity";
import * as Types from "../types/customer.order.types";
import { plainToInstance } from "class-transformer";

const initialState: MultipleEntitiesStateInterface<Order> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const customerOrdersReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Order> => {
    switch (action.type) {
        case Types.FETCH_CUSTOMER_ORDERS:
            return {
                ...state,
                fetchState: ActionState.inProgress,
            };
        case Types.FETCH_CUSTOMER_ORDERS_SUCCESS:
            return {
                ...state,
                fetchState: ActionState.done,
                entities: plainToInstance(Order, action.payload.data),
            };
        case Types.FETCH_CUSTOMER_ORDERS_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        default:
            return state;
    }
};
