import * as Type from "../types/payment.types";

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
