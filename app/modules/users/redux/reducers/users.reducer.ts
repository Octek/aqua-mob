import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/user.types";

const initialState: MultipleEntitiesStateInterface<User> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const usersReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<User> => {
    switch (action.type) {
        case Types.GET_USERS:
        case Types.GET_USERS_SUCCESS:
        case Types.GET_USERS_FAIL:
        default:
            return state;
    }
};
