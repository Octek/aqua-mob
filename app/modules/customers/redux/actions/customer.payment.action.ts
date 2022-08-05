import * as Types from "../types/customer.payment.types";
import { Payment } from "../../../../common/entities/payment.entity";

export const cleanCustomerPayments = () => {
    return {
        type: Types.CLEAN_CUSTOMER_PAYMENTS,
    };
};
export const fetchCustomerPayments = (id: number, page: number) => {
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

export const addCustomerPayment = (payment: Payment) => {
    return {
        type: Types.ADD_CUSTOMER_PAYMENT,
        payload: {
            payment: payment,
        },
    };
};
