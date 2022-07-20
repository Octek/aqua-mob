import {
    ActionState,
    MultipleEntitiesStateInterface,
} from "../../../../common/redux/entity.state.interface";
import { Product } from "../../../../common/entities/product.entity";
import * as Types from "../types/product.types";
import { plainToInstance } from "class-transformer";
import { PageInfo } from "../../../../common/entities/page.info.entity";

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
    switch (action.type) {
        case Types.CLEANUP_PRODUCTS:
            return {
                ...state,
                fetchState: ActionState.notStarted,
                addState: ActionState.notStarted,
                updateState: ActionState.notStarted,
                deleteState: ActionState.notStarted,
            };
        case Types.FETCH_PRODUCTS:
            return {
                ...state,
                fetchState: ActionState.inProgress,
            };
        case Types.FETCH_PRODUCTS_SUCCESS:
            const page = plainToInstance(
                PageInfo,
                <PageInfo>action.payload.data.meta,
            );
            const products = plainToInstance(
                Product,
                <Product[]>action.payload.data.data,
            );
            return {
                ...state,
                fetchState: ActionState.done,
                page: page,
                entities:
                    page.currentPage === 1
                        ? products
                        : [...state.entities, ...products],
            };
        case Types.FETCH_PRODUCTS_FAIL:
            console.log("fetch product fail");
            return { ...state, fetchState: ActionState.failed };
        case Types.ADD_PRODUCT:
            return { ...state, addState: ActionState.inProgress };
        case Types.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addState: ActionState.done,
                entities: [
                    ...state.entities,
                    plainToInstance(Product, action.payload.data as Product),
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
        case Types.ADD_PRODUCT_FAIL:
            return {
                ...state,
                addState: ActionState.failed,
            };
        case Types.UPDATE_PRODUCT:
            return { ...state, updateState: ActionState.inProgress };
        case Types.UPDATE_PRODUCT_SUCCESS:
            const updatedProduct = plainToInstance(
                Product,
                action.payload.data as Product,
            );
            return {
                ...state,
                updateState: ActionState.done,
                entities: [
                    ...state.entities.map((product) =>
                        updatedProduct.id === product.id
                            ? updatedProduct
                            : product,
                    ),
                ],
            };
        case Types.UPDATE_PRODUCT_FAIL:
            return { ...state, updateState: ActionState.failed };
        default:
            return state;
    }
};
