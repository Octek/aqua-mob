import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/payment.types";

export const setPaymentCustomer = (customer: User) => {
    return {
        type: Types.SET_PAYMENT_CUSTOMER,
        payload: {
            customer: customer,
        },
    };
};

export const cleanupNewPayment = () => {
    return {
        type: Types.CLEANUP_NEW_PAYMENTS,
        payload: {
            payment: undefined,
        },
    };
};
