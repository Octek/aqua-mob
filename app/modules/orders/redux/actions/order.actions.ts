import { PlaceOrderDto } from "../../dtos/place.order.dto";
import * as Types from "../types/order.types";
import { Order } from "../../../../common/entities/order.entity";

export const cleanupOrders = () => {
    return {
        type: Types.CLEANUP_ORDERS,
    };
};

export const cleanupOrder = () => {
    return {
        type: Types.CLEANUP_ORDER,
    };
};

export const cleanupOrderState = () => {
    return {
        type: Types.CLEANUP_ORDER_STATE,
    };
};

export const refreshOrder = (order: Order) => {
    return {
        type: Types.REFRESH_ORDER,
        payload: {
            order: order,
        },
    };
};

export const placeOrder = (orderDto: PlaceOrderDto) => {
    console.log("orderDto1:", orderDto);
    console.log("orderDto2:", orderDto.toJson());
    return {
        type: Types.PLACE_ORDER,
        payload: {
            request: {
                method: "POST",
                url: "/orders",
                data: orderDto.toJson(),
            },
        },
    };
};

export const getOrders = (page = 1) => {
    return {
        type: Types.GET_ORDERS,
        payload: {
            request: {
                method: "GET",
                url: `/orders?page=${page}`,
            },
        },
    };
};

export const getOrderDetails = (orderId: number) => {
    return {
        type: Types.GET_ORDER,
        payload: {
            request: {
                method: "GET",
                url: `/orders/${orderId}`,
            },
        },
    };
};

export const fulfilOrder = (orderId: number) => {
    return {
        type: Types.FULFIL_ORDER,
        payload: {
            request: {
                method: "PATCH",
                url: `/orders/${orderId}/fulfil`,
            },
        },
    };
};

export const dispatchOrder = (orderId: number) => {
    return {
        type: Types.DISPATCH_ORDER,
        payload: {
            request: {
                method: "PATCH",
                url: `/orders/${orderId}/dispatch`,
            },
        },
    };
};

export const cancelOrder = (orderId: number, reason: string) => {
    return {
        type: Types.CANCEL_ORDER,
        payload: {
            request: {
                method: "PATCH",
                url: `/orders/${orderId}/cancel`,
                data: {
                    reason: reason,
                },
            },
        },
    };
};
