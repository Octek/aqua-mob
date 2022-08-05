import * as Types from "../types/customer.order.types";
import { User } from "../../../../common/entities/user.entity";
import { Order } from "../../../../common/entities/order.entity";

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
    return {
        type: Types.SET_CUSTOMER,
        payload: { customer: customer },
    };
};
export const addCustomerOrder = (order: Order) => {
    return {
        type: Types.ADD_CUSTOMER_ORDER,
        payload: { order: order },
    };
};
