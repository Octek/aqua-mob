import * as Types from "../types/customer.ledger.types";

export const fetchCustomerLedger = (customerId: number, startDate: string) => {
    console.log("actionData===", customerId, startDate);
    return {
        type: Types.FETCH_LEDGER,
        payload: {
            request: {
                method: "GET",
                url: `/customers/${customerId}/ledger?startDate=${startDate}`,
            },
        },
    };
};
