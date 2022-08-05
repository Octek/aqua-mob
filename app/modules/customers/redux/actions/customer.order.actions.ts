import * as Types from "../types/customer.order.types";
import { User } from "../../../../common/entities/user.entity";
import { Order } from "../../../../common/entities/order.entity";
import { PlaceOrderDto } from "../../../orders/dtos/place.order.dto";

export const fetchCustomerOrders = (customerId: number) => {
    console.log("action Called id:", customerId);
    return {
        type: Types.FETCH_CUSTOMER_ORDERS,
        payload: {
            request: {
                method: "GET",
                url: `/customers/${customerId}/orders`,
            },
        },
    };
};

export const cleanupCustomerOrders = () => {
    return {
        type: Types.CLEANUP_CUSTOMER_ORDERS,
    };
};

export const setOrderCustomer = (customer: User) => {
    console.log("customer====", customer);
    return {
        type: Types.SET_CUSTOMER,
        payload: { customer: customer },
    };
};
export const addCustomerOrder = (order: Order) => {
    console.log("data===", order);
    return {
        type: Types.UPDATE_CUSTOMER_ORDERS,
        payload: { order: order },
    };
};
export const placeCustomerOrder = (orderDto: PlaceOrderDto) => {
    console.log("orderDto1:", orderDto);
    console.log("orderDto2:", orderDto.toJson());
    return {
        type: Types.PLACE_CUSTOMER_ORDER,
        payload: {
            request: {
                method: "POST",
                url: "/orders",
                data: orderDto.toJson(),
            },
        },
    };
};
