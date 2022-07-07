import { FETCH_PRODUCTS } from "../types/product.types";

export const fetchProducts = () => {
    return {
        type: FETCH_PRODUCTS,
        payload: {
            request: {
                method: "GET",
                url: "/products",
            },
        },
    };
};
