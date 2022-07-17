import { PaymentItemDto } from "../../dtos/payment.item.dto";
import * as Types from "../types/payment.types";
import { instanceToPlain } from "class-transformer";

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
