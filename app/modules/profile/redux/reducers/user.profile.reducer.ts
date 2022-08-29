import {
    ActionState,
    EntityStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/profile.types";

const initialState: EntityStateInterface<User> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entity: undefined,
};

export const userProfileReducer = (
    state = initialState,
    action: any,
): EntityStateInterface<User> => {
    switch (action.type) {
        case Types.CLEAN_USER_PROFILE:
            return initialState;
        case Types.UPDATE_USER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entity: action.payload.data,
            };
        case Types.UPDATE_USER_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        default:
            return { ...state };
    }
};
