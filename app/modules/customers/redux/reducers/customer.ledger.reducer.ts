import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { LedgerItem } from "../../../../common/entities/ledger.entity";
import * as Types from "../types/customer.ledger.types";
import { plainToInstance } from "class-transformer";
import { PageInfo } from "../../../../common/entities/page.info.entity";

const initialState: MultipleEntitiesStateInterface<LedgerItem> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const customerLedgerReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<LedgerItem> => {
    switch (action.type) {
        case Types.CLEANUP_LEDGER:
            return initialState;
        case Types.FETCH_LEDGER:
            console.log("actionData=== inprogres", action.payload);
            return { ...state, fetchState: ActionState.inProgress };
        case Types.FETCH_LEDGER_SUCCESS:
            const page = plainToInstance(
                PageInfo,
                <PageInfo>action.payload.data.transactions.meta,
            );
            const ledgerData = plainToInstance(
                LedgerItem,
                <LedgerItem[]>action.payload.data.transactions.data,
            );
            return {
                ...state,
                fetchState: ActionState.done,
                entities:
                    page.currentPage === 1
                        ? ledgerData
                        : [...state.entities, ...ledgerData],
                // entities: [
                //     ...plainToInstance(
                //         Ledger,
                //         <Ledger[]>action.payload.data.transactions.data,
                //     ),
                // ],
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
