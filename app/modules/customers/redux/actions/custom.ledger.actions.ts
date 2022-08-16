import * as Types from "../types/customer.ledger.types";

export const fetchCustomerLedger = (
    customerId: number,
    startDate: string,
    page: number,
) => {
    console.log("actionData===", customerId, startDate);
    return {
        type: Types.FETCH_LEDGER,
        payload: {
            request: {
                method: "GET",
                url: `/customers/${customerId}/ledger?startDate=${startDate}&page=${page}`,
            },
        },
    };
};

export const cleanCustomerLedger = () => {
    return {
        type: Types.CLEANUP_LEDGER,
    };
};
