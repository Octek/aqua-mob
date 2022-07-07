import { OrderItemDto } from "../../dtos/order.item.dto";
import * as Types from "../types/cart.types";

export interface CartItemInterface {
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
        default:
            return state;
    }
};
