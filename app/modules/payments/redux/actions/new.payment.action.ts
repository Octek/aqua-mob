import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/payment.types";

export const setPaymentsCustomer = (customer: User) => {
    return {
        type: Types.SET_PAYMENTS_CUSTOMER,
        payload: {
            customer: customer,
        },
    };
};
