import { AddCustomerDto } from "../../dtos/add.customer.dto";
import * as Types from "../types/customer.types";
import { instanceToPlain } from "class-transformer";
import { UpdateCustomerDto } from "../../dtos/update.customer.dto";

export const cleanupCustomers = () => {
    return {
        type: Types.CLEANUP_CUSTOMERS,
        payload: {
            customer: undefined,
        },
    };
};

export const fetchCustomers = () => {
    return {
        type: Types.FETCH_CUSTOMERS,
        payload: {
            request: {
                method: "GET",
                url: "/customers",
            },
        },
    };
};

export const addCustomer = (customerDto: AddCustomerDto) => {
    return {
        type: Types.ADD_CUSTOMER,
        payload: {
            request: {
                method: "POST",
                url: "/customers",
                data: instanceToPlain(customerDto),
            },
        },
    };
};

export const updateCustomer = (
    customerId: number,
    customerDto: UpdateCustomerDto,
) => {
    return {
        type: Types.UPDATE_CUSTOMER,
        payload: {
            request: {
                method: "PUT",
                url: `/customers/${customerId}`,
                data: instanceToPlain(customerDto),
            },
        },
    };
};
