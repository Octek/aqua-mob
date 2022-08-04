import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/customer.types";
import { plainToInstance } from "class-transformer";

const initialState: EntityStateInterface<User> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};

export const customerReducer = (
    state = initialState,
    action: any,
): EntityStateInterface<User> => {
    switch (action.type) {
        case Types.CLEANUP_CUSTOMER:
            return initialState;
        case Types.BLOCK_CUSTOMER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.BLOCK_CUSTOMER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(User, <User>action.payload.data),
            };
        case Types.BLOCK_CUSTOMER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        case Types.UNBLOCK_CUSTOMER:
            return { ...state, updateState: ActionState.inProgress };

        case Types.UNBLOCK_CUSTOMER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(User, <User>action.payload.data),
            };
        case Types.UNBLOCK_CUSTOMER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        case Types.SET_CUSTOMER_DETAIL:
            return {
                ...state,
                entity: action.payload.customer,
            };
        default:
            return {
                ...state,
            };
    }
};
