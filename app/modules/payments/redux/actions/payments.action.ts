import { PaymentItemDto } from "../../dtos/payment.item.dto";
import * as Types from "../types/payment.types";
import { instanceToPlain } from "class-transformer";

export const cleanupPayments = () => {
    return {
        type: Types.CLEANUP_PAYMENTS,
    };
};
export const cleanupNewPayments = () => {
    return {
        type: Types.CLEANUP_NEW_PAYMENTS,
        payload: {
            payment: undefined,
        },
    };
};

export const addPayment = (paymentItems: PaymentItemDto) => {
    return {
        type: Types.ADD_PAYMENT,
        payload: {
            request: {
                method: "POST",
                url: "/payments",
                data: instanceToPlain(paymentItems),
            },
        },
    };
};

export const fetchPayments = () => {
    return {
        type: Types.FETCH_PAYMENTS,
        payload: {
            request: {
                method: "GET",
                url: "/payments",
            },
        },
    };
};
