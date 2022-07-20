import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Payment } from "../../../../common/entities/payment.entity";

const initialState: EntityStateInterface<Payment> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};

export const newPaymentReducer = (state = initialState, action: any) => {};
