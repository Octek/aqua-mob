import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Payment } from "../../../../common/entities/payment.entity";
import * as Type from "../types/payment.types";
import { plainToInstance } from "class-transformer";
import { PageInfo } from "../../../../common/entities/page.info.entity";

const initialState: MultipleEntitiesStateInterface<Payment> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const paymentReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Payment> => {
    switch (action.type) {
        case Type.CLEANUP_PAYMENTS:
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
            };
        case Type.ADD_PAYMENT:
            console.log("called");
            return { ...state, addState: ActionState.inProgress };
        case Type.ADD_PAYMENT_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    plainToInstance(Payment, <Payment>action.payload.data),
                    ...state.entities,
                ],
            };
        case Type.ADD_PAYMENT_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        case Type.FETCH_PAYMENTS:
            return { ...state, fetchState: ActionState.inProgress };
        case Type.FETCH_PAYMENTS_SUCCESS:
            const page = plainToInstance(
                PageInfo,
                <PageInfo>action.payload.data.meta,
            );
            const payments = plainToInstance(Payment, action.payload.data.data);
            return {
                ...state,
                fetchState: ActionState.done,
                page: page,
                entities:
                    page.currentPage === 1
                        ? payments
                        : [...state.entities, ...payments],
            };
        case Type.FETCH_PAYMENTS_FAIL:
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        case Type.REVERSE_PAYMENT:
            return { ...state, addState: ActionState.inProgress };
        case Type.REVERSE_PAYMENT_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    ...plainToInstance(Payment, <Payment[]>action.payload.data),
                    ...state.entities.filter((oldData) =>
                        action.payload.data.findIndex(
                            (newData: any) => newData.id === oldData.id,
                        ),
                    ),
                ],
            };
        case Type.REVERSE_PAYMENT_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        default:
            return state;
    }
};
