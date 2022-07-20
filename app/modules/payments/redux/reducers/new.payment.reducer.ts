import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Payment } from "../../../../common/entities/payment.entity";
import * as Type from "../types/payment.types";

const initialState: EntityStateInterface<Payment> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};

export const newPaymentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Type.CLEANUP_NEW_PAYMENTS:
            console.log("called");
            return { ...state, addState: action.payload.payment };
        default:
            return state;
    }
};
