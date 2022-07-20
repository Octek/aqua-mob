import * as Types from "../types/cart.types";
import { OrderItemDto } from "../../dtos/order.item.dto";
import { User } from "../../../../common/entities/user.entity";

export const addItem = (item: OrderItemDto) => {
    return {
        type: Types.ADD_ITEM,
        payload: {
            item: item,
        },
    };
};

export const setCustomer = (customer: User) => {
    return {
        type: Types.SET_CUSTOMER,
        payload: {
            customer: customer,
        },
    };
};

export const cleanUPCustomer = () => {
    return {
        type: Types.CLEANUP_CUSTOMER,
        payload: {
            customer: undefined,
        },
    };
};
