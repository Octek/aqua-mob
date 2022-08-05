import * as Types from "../types/cart.types";
import { OrderItemDto } from "../../dtos/order.item.dto";
import { User } from "../../../../common/entities/user.entity";

export const voidCart = () => {
    return {
        type: Types.VOID_CART,
        payload: {},
    };
};

export const addItem = (item: OrderItemDto) => {
    return {
        type: Types.ADD_ITEM,
        payload: {
            item: item,
        },
    };
};

export const increaseQty = (item: OrderItemDto) => {
    return {
        type: Types.INCREASE_QTY,
        payload: {
            item: item,
        },
    };
};

export const decreaseQty = (item: OrderItemDto) => {
    return {
        type: Types.DECREASE_QTY,
        payload: {
            item: item,
        },
    };
};

export const setCartCustomer = (customer: User) => {
    console.log("customerSelected==", customer);
    return {
        type: Types.SET_CUSTOMER,
        payload: {
            customer: customer,
        },
    };
};

export const setDeliveryCharges = (charges: number) => {
    return {
        type: Types.SET_DELIVERY_CHARGES,
        payload: {
            deliveryCharges: charges,
        },
    };
};
export const cleanupCartCustomer = () => {
    return {
        type: Types.CLEANUP_CART_CUSTOMER,
    };
};
