import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Product } from "../../../../common/entities/product.entity";
import * as Types from "../types/product.types";

const initialState: MultipleEntitiesStateInterface<Product> = {
    fetchState: ActionState.notStarted,
    addState: ActionState.notStarted,
    updateState: ActionState.notStarted,
    deleteState: ActionState.notStarted,
    entities: [],
};

export const productsReducer = (
    state = initialState,
    action: any,
): MultipleEntitiesStateInterface<Product> => {
    console.log("herer", action);
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            console.log("fetch products");
            return { ...state, fetchState: ActionState.inProgress };
        case Types.FETCH_PRODUCTS_SUCCESS:
            console.log("fetch product success");
            return {
                ...state,
                fetchState: ActionState.done,
                entities: action.payload.data,
            };
        case Types.FETCH_PRODUCTS_FAIL:
            console.log("fetch product fail");
            return { ...state, fetchState: ActionState.failed };
        default:
            return state;
    }
};
