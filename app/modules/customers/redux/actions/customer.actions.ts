import * as Types from "../types/customer.types";

export const blockCustomer = (customerId: number) => {
    console.log("action called");
    return {
        type: Types.BLOCK_CUSTOMER,
        payload: {
            request: {
                method: "PATCH",
                url: `/customers/${customerId}/block`,
            },
        },
    };
};

export const unblockCustomer = (customerId: number) => {
    console.log("customerId===", customerId);
    return {
        type: Types.UNBLOCK_CUSTOMER,
        payload: {
            request: {
                method: "PATCH",
                url: `/customers/${customerId}/unblock`,
            },
        },
    };
};

export const cleanupCustomer = () => {
    return {
        type: Types.CLEANUP_CUSTOMER,
    };
};
