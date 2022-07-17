import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Payment } from "../../../../common/entities/payment.entity";
// import * as Type from "../types/payment.orders.types";
import * as Type from "../types/payment.types";
import { plainToInstance } from "class-transformer";

const initialState: MultipleEntitiesStateInterface<Payment> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const paymentOrdersReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Payment> => {
    switch (action.type) {
        case Type.ADD_PAYMENT:
            console.log("called");
            return { ...state, fetchState: ActionState.inProgress };
        case Type.ADD_PAYMENT_SUCCESS:
            return {
                ...state,
                fetchState: ActionState.done,
                entities: plainToInstance(Payment, action.payload.data.data),
            };
        case Type.ADD_PAYMENT_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        default:
            return state;
    }
};
