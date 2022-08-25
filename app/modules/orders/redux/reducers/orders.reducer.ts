import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Order } from "../../../../common/entities/order.entity";
import * as Types from "../types/order.types";
import { plainToInstance } from "class-transformer";
import { PageInfo } from "../../../../common/entities/page.info.entity";

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
        case Types.CLEANUP_ORDERS:
            // return initialState;
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
            };
        case Types.REFRESH_ORDER:
            return {
                ...state,
                entities: state.entities.map((order) =>
                    order.id === action.payload.order.id
                        ? action.payload.order
                        : order,
                ),
            };
        case Types.GET_ORDERS:
            return { ...state, fetchState: ActionState.inProgress };
        case Types.GET_ORDERS_SUCCESS:
            const page = plainToInstance(
                PageInfo,
                <PageInfo>action.payload.data.meta,
            );
            const orders = plainToInstance(
                Order,
                <Order[]>action.payload.data.data,
            );
            return {
                ...state,
                fetchState: ActionState.done,
                page: page,
                entities:
                    page.currentPage === 1
                        ? orders
                        : [...state.entities, ...orders],
            };
        case Types.GET_ORDERS_FAIL:
            return { ...state, fetchState: ActionState.failed };
        case Types.PLACE_ORDER:
            return { ...state, addState: ActionState.inProgress };
        case Types.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    // plainToInstance(Order, <Order>action.payload.data),

                    plainToInstance(Order, <Order>action.payload.data),
                    ...state.entities,
                ],
            };
        case Types.PLACE_ORDER_FAIL:
            return { ...state, addState: ActionState.failed };
        default:
            return state;
    }
};
