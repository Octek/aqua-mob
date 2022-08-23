import { ActionState } from "../../../../common/redux/entity.state.interface";
import * as Types from "../types/profile.types";

export interface ChangePasswordInterface {
    fetchState: ActionState;
    addState: ActionState;
    updateState: ActionState;
    deleteState: ActionState;
    isChangedPassword: boolean;
}

const initialState: ChangePasswordInterface = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    isChangedPassword: false,
};

export const passwordChangeReducer = (
    state = initialState,
    action: any,
): ChangePasswordInterface => {
    switch (action.type) {
        case Types.CLEAR_CHANGE_PASSWORD:
            return initialState;
        case Types.CHANGE_PASSWORD:
            return { ...state, updateState: ActionState.inProgress };
        case Types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                isChangedPassword: action.payload.data,
            };
        case Types.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                updateState: ActionState.failed,
            };
        default:
            return { ...state };
    }
};
