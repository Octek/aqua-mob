import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/customer.types";
import { plainToInstance } from "class-transformer";

const initialState: MultipleEntitiesStateInterface<User> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const customersReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<User> => {
    console.log("action.type:", action.type);
    switch (action.type) {
        case Types.CLEANUP_CUSTOMERS:
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
            };
        case Types.FETCH_CUSTOMERS:
            return { ...state, fetchState: ActionState.inProgress };
        case Types.FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                fetchState: ActionState.done,
                entities: plainToInstance(User, action.payload.data.data),
            };
        case Types.FETCH_CUSTOMERS_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        case Types.ADD_CUSTOMER:
            return {
                ...state,
                addState: ActionState.inProgress,
            };
        case Types.ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    ...state.entities,
                    plainToInstance(User, action.payload.data as User),
                ].sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }),
            };
        case Types.ADD_CUSTOMER_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        case Types.UPDATE_CUSTOMER:
            console.log("1");
            return {
                ...state,
                updateState: ActionState.inProgress,
            };
        case Types.UPDATE_CUSTOMER_SUCCESS:
            const updatedCustomer = plainToInstance(
                User,
                action.payload.data as User,
            );
            console.log("2");
            return {
                ...state,
                updateState: ActionState.done,
                entities: [
                    ...state.entities.map((customer) =>
                        updatedCustomer.id === customer.id
                            ? updatedCustomer
                            : customer,
                    ),
                ],
            };
        case Types.UPDATE_CUSTOMER_FAIL:
            console.log("3");
            return {
                ...state,
                updateState: ActionState.failed,
            };
        default:
            return state;
    }
};
