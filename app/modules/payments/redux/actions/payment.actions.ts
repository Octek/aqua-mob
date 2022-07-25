import { PaymentDto } from "../../dtos/payment.dto";
import * as Types from "../types/payment.types";
import { instanceToPlain } from "class-transformer";

export const cleanupPayments = () => {
    return {
        type: Types.CLEANUP_PAYMENTS,
    };
};

export const addPayment = (paymentItems: PaymentDto) => {
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

export const fetchPayments = (page = 1) => {
    return {
        type: Types.FETCH_PAYMENTS,
        payload: {
            request: {
                method: "GET",
                url: `/payments?page=${page}`,
            },
        },
    };
};

export const reversePayment = (id: String) => {
    return {
        type: Types.FETCH_PAYMENTS,
        payload: {
            request: {
                method: "Post",
                url: `/payments?page=${id}`,
                data: "this is the reason",
            },
        },
    };
};
