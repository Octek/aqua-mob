import * as Type from "../types/payment.orders.types";

export const fetchPayments = () => {
    return {
        type: Type.FETCH_PAYMENTS,
        payload: {
            request: {
                method: "GET",
                url: "/payments",
            },
        },
    };
};
