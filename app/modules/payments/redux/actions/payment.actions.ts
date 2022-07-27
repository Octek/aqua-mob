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

export const fetchPayments = (page = 1, filter = 0) => {
    return {
        type: Types.FETCH_PAYMENTS,
        payload: {
            request: {
                method: "GET",
                url:
                    filter == 2
                        ? `/payments?page=${page}`
                        : `/payments?page=${page}&filter.mode=$in:${filter}`,
            },
        },
    };
};

export const reversePayment = (id: Number) => {
    return {
        type: Types.REVERSE_PAYMENT,
        payload: {
            request: {
                method: "Post",
                url: `/payments/${[id]}/reverse`,
                data: "this is the reason",
            },
        },
    };
};
