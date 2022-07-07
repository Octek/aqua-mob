import * as Types from "../types/cart.types";
import { OrderItemDto } from "../../dtos/order.item.dto";

export const addItem = (item: OrderItemDto) => {
    return {
        type: Types.ADD_ITEM,
        payload: {
            item: item,
        },
    };
};
