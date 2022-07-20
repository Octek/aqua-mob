import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Order } from "../../../../common/entities/order.entity";
import * as Types from "../types/order.types";
import { plainToInstance } from "class-transformer";

const initialState: EntityStateInterface<Order> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};

export const orderReducer = (
    state = initialState,
    action: any,
): EntityStateInterface<Order> => {
    switch (action.type) {
        case Types.CLEANUP_ORDER:
            return initialState;
        case Types.GET_ORDER:
            return { ...state, fetchState: ActionState.inProgress };
        case Types.GET_ORDER_SUCCESS:
            return {
                ...state,
                fetchState: ActionState.done,
                entity: plainToInstance(Order, <Order>action.payload.data),
            };
        case Types.GET_ORDER_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        case Types.CANCEL_ORDER:
            return {
                ...state,
                updateState: ActionState.inProgress,
            };
        case Types.CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(Order, <Order>action.payload.data),
            };
        case Types.CANCEL_ORDER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        case Types.DISPATCH_ORDER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.DISPATCH_ORDER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(Order, <Order>action.payload.data),
            };
        case Types.DISPATCH_ORDER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        case Types.FULFIL_ORDER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.FULFIL_ORDER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(Order, <Order>action.payload.data),
            };
        case Types.FULFIL_ORDER_FAIL:
            return { ...state, updateState: ActionState.failed };
        default:
            return state;
    }
};
