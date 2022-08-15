import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Ledger } from "../../../../common/entities/ledger.entity";
import * as Types from "../types/customer.ledger.types";
import { plainToInstance } from "class-transformer";

const initialState: MultipleEntitiesStateInterface<Ledger> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const customerLedgerReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Ledger> => {
    switch (action.type) {
        case Types.FETCH_LEDGER:
            console.log("actionData=== inprogres", action.payload.data);
            return { ...state, fetchState: ActionState.inProgress };
        case Types.FETCH_LEDGER_SUCCESS:
            console.log("actionData===", action.payload.data.transactions.data);

            return {
                ...state,
                fetchState: ActionState.done,
                entities: [
                    ...plainToInstance(
                        Ledger,
                        <Ledger[]>action.payload.data.transactions.data,
                    ),
                ],
            };
        case Types.FETCH_LEDGER_FAIL:
            console.log("actionData=== fail", action.payload.data);
            return {
                ...state,
                fetchState: ActionState.failed,
            };
        default:
            return {
                ...state,
            };
    }
};
