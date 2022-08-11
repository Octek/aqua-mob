import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/users.types";
import { plainToInstance } from "class-transformer";

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
        case Types.CLEANUP_USERS:
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
            };
        case Types.GET_USERS:
            return { ...state, fetchState: ActionState.inProgress };
        case Types.GET_USERS_SUCCESS:
            // console.log("usersData===", action.payload.data.data);
            return {
                ...state,
                fetchState: ActionState.done,
                entities: plainToInstance(
                    User,
                    <User[]>action.payload.data.data,
                ),
            };
        case Types.GET_USERS_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        case Types.ADD_USER:
            return { ...state, addState: ActionState.inProgress };
        case Types.ADD_USER_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    plainToInstance(User, <User>action.payload.data),
                    ...state.entities,
                ],
            };
        case Types.ADD_USER_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        case Types.UPDATE_USER:
            return { ...state, updateState: ActionState.inProgress };
        case Types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateState: ActionState.done,
                entities: state.entities.map((entity) => {
                    if (entity.id === action.payload.data.id) {
                        return plainToInstance(User, <User>action.payload.data);
                    } else {
                        return entity;
                    }
                }),
            };
        case Types.UPDATE_USER_FAIL:
            return { ...state, updateState: ActionState.failed };
        case Types.REFRESH_USER:
            return {
                ...state,
                entities: state.entities.map((user) =>
                    user.id === action.payload.user.id
                        ? action.payload.user
                        : user,
                ),
            };
        default: {
            return state;
        }
    }
};
