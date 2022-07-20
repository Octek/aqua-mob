import { OrderItemDto } from "../../dtos/order.item.dto";
import * as Types from "../types/cart.types";
import { User } from "../../../../common/entities/user.entity";

export interface CartItemInterface {
    customer: User | undefined;
    items: OrderItemDto[];
}

const initialState: CartItemInterface = {
    customer: undefined,
    items: [],
};

export const cartReducer = (
    state = initialState,
    action: any,
): CartItemInterface => {
    switch (action.type) {
        case Types.VOID_CART:
            return initialState;
        case Types.ADD_ITEM:
            let found = false;
            const items = state.items.map((item) => {
                if (item.product.id === action.payload.item.product.id) {
                    found = true;
                    item.quantity += 1;
                }
                return item;
            });
            if (!found) {
                return {
                    ...state,
                    items: [...state.items, action.payload.item],
                };
            } else {
                return { ...state, items: items };
            }
        case Types.SET_CUSTOMER:
            return { ...state, customer: action.payload.customer };
        default:
            return state;
    }
};
