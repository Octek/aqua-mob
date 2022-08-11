import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import * as Types from "../types/user.types";
import { User } from "../../../../common/entities/user.entity";
import { plainToInstance } from "class-transformer";

const initialState: EntityStateInterface<User> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};
export const userReducer = (
    state = initialState,
    action: any,
): EntityStateInterface<User> => {
    switch (action.type) {
        case Types.CLEANUP_USER:
            return initialState;
        case Types.BLOCK_USER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.BLOCK_USER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(User, <User>action.payload.data),
            };
        case Types.BLOCK_USER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        case Types.UNBLOCK_USER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: plainToInstance(User, <User>action.payload.data),
            };
        case Types.UNBLOCK_USER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        default:
            return { ...state };
    }
};
