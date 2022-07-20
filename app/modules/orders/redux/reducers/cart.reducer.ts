import { OrderItemDto } from "../../dtos/order.item.dto";
import * as Types from "../types/cart.types";
import { User } from "../../../../common/entities/user.entity";

export interface CartItemInterface {
    customer: User | undefined;
    items: OrderItemDto[];
}

const initialState: CartItemInterface = {
    items: [],
};

export const cartReducer = (
    state = initialState,
    action: any,
): CartItemInterface => {
    switch (action.type) {
        case Types.ADD_ITEM:
            const items = [...state.items, action.payload.item];
            return { ...state, items };
        case Types.SET_CUSTOMER:
            return { ...state, customer: action.payload.customer };
        default:
            return state;
    }
};
