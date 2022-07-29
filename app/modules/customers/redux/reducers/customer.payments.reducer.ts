import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Payment } from "../../../../common/entities/payment.entity";
import * as Type from "../types/customer.payment.types";
import { plainToInstance } from "class-transformer";

const initialState: MultipleEntitiesStateInterface<Payment> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const customerPaymentsReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Payment> => {
    switch (action.type) {
        case Type.CLEAN_CUSTOMER_PAYMENTS:
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
                entities: [],
            };
        case Type.CUSTOMER_PAYMENTS:
            return { ...state, addState: ActionState.inProgress };
        case Type.CUSTOMER_PAYMENTS_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: plainToInstance(
                    Payment,
                    <Payment[]>action.payload.data.data,
                ),
            };
        case Type.CUSTOMER_PAYMENTS_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        case Type.ADD_CUSTOMER_PAYMENT:
            console.log("AddCustomerPayload===", action.payload);
            return {
                ...state,
                entities: [
                    {
                        ...action.payload.payment,
                        isReversal: false,
                        hasReversal: false,
                    },
                    ...state.entities,
                ],
            };
        default:
            return state;
    }
};
