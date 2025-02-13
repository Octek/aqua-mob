import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Order } from "../../../../common/entities/order.entity";
import * as Types from "../types/customer.order.types";
import { plainToInstance } from "class-transformer";
import { PageInfo } from "../../../../common/entities/page.info.entity";

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
        case Types.CLEANUP_CUSTOMER_ORDERS:
            return initialState;
        case Types.FETCH_CUSTOMER_ORDERS:
            return {
                ...state,
                fetchState: ActionState.inProgress,
            };
        case Types.FETCH_CUSTOMER_ORDERS_SUCCESS:
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
                // entities: plainToInstance(
                //     Order,
                //     <Order[]>action.payload.data.data,
                // ),
                // page.currentPage === 1
                //     ? payments
                //     : [...state.entities, ...payments],
            };
        case Types.FETCH_CUSTOMER_ORDERS_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };

        case Types.ADD_CUSTOMER_ORDER:
            return {
                ...state,
                entities: [
                    plainToInstance(Order, <Order>action.payload.order),
                    ...state.entities,
                ],
            };
        default:
            return state;
    }
};
