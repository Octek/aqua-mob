import { OrderItemDto } from "../../dtos/order.item.dto";
import * as Types from "../types/cart.types";
import { User } from "../../../../common/entities/user.entity";
import { CLEANUP_CART_CUSTOMER } from "../types/cart.types";
import { createIconSet } from "react-native-vector-icons";

export interface CartItemInterface {
    customer: User | undefined;
    deliveryCharges: number;
    items: OrderItemDto[];
}

const initialState: CartItemInterface = {
    customer: undefined,
    deliveryCharges: 0,
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

        case Types.INCREASE_QTY:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === action.payload.item.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            };

        case Types.DECREASE_QTY:
            const newItems = state.items
                .map((item) =>
                    item.product.id === action.payload.item.product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0);
            return { ...state, items: newItems };

        case Types.SET_CUSTOMER:
            return { ...state, customer: action.payload.customer };

        case Types.SET_DELIVERY_CHARGES:
            return {
                ...state,
                deliveryCharges: action.payload.deliveryCharges,
            };

        case Types.CLEANUP_CART_CUSTOMER:
            return initialState;
        // case Types.CLEANUP_CART_CUSTOMER:
        //     return { ...state, customer: action.payload.customer };
        default:
            return state;
    }
};
