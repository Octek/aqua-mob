import * as Types from "../types/customer.payment.types";

export const fetchCustomerPayments = (id: number) => {
    console.log("action==", id);
    return {
        type: Types.CUSTOMER_PAYMENTS,
        payload: {
            request: {
                method: "GET",
                url: `/customers/${id}/payments`,
            },
        },
    };
};
