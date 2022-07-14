import * as Types from "../types/product.types";
import { ProductDto } from "../../dtos/product.dto";
import { instanceToPlain } from "class-transformer";

export const fetchProducts = () => {
    return {
        type: Types.FETCH_PRODUCTS,
        payload: {
            request: {
                method: "GET",
                url: "/products",
            },
        },
    };
};

export const addProduct = (productDto: ProductDto) => {
    return {
        type: Types.ADD_PRODUCT,
        payload: {
            request: {
                method: "POST",
                url: "/products",
                data: instanceToPlain(productDto),
            },
        },
    };
};

export const updateProduct = (productId: number, productDto: ProductDto) => {
    return {
        type: Types.UPDATE_PRODUCT,
        payload: {
            request: {
                method: "PUT",
                url: `/products/${productId}`,
                data: instanceToPlain(productDto),
            },
        },
    };
};
