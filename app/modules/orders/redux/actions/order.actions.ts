import { PlaceOrderDto } from "../../dtos/place.order.dto";
import * as Types from "../types/order.types";
import { instanceToPlain } from "class-transformer";

export const placeOrder = (orderDto: PlaceOrderDto) => {
    return {
        type: Types.PLACE_ORDER,
        payload: {
            request: {
                method: "POST",
                url: "/orders",
                data: instanceToPlain(orderDto),
            },
        },
    };
};

export const getOrders = () => {
    return {
        type: Types.GET_ORDERS,
        payload: {
            request: {
                method: "GET",
                url: "/orders",
            },
        },
    };
};

export const fulfilOrder = (orderId: number) => {
    return {
        types: Types.FULFIL_ORDER,
        payload: {
            method: "PATCH",
            url: `/orders/${orderId}/fulfil`,
        },
    };
};

export const cancelOrder = (orderId: number) => {
    return {
        types: Types.CANCEL_ORDER,
        payload: {
            method: "PATCH",
            url: `/orders/${orderId}/cancel`,
        },
    };
};
