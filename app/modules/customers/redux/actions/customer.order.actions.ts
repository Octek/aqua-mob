import * as Types from "../types/customer.order.types";

export const fetchCustomerOrders = (customerId: number) => {
    return {
        type: Types.FETCH_CUSTOMER_ORDERS,
        payload: {
            request: {
                method: "GET",
                url: `customers/${customerId}/orders`,
            },
        },
    };
};
