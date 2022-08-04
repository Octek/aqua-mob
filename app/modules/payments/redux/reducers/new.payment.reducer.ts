import * as Type from "../types/payment.types";
import { User } from "../../../../common/entities/user.entity";

export interface NewPaymentInterface {
    customer: User | undefined;
}

const initialState: NewPaymentInterface = {
    customer: undefined,
};

export const newPaymentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Type.CLEANUP_NEW_PAYMENTS:
            return { ...state, customer: undefined };
        case Type.SET_PAYMENT_CUSTOMER:
            return {
                ...state,
                customer: action.payload.customer,
            };
        default:
            return state;
    }
};
