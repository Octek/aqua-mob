import { AddCustomerDto } from "../../dtos/add.customer.dto";
import * as Types from "../types/customers.types";
import { instanceToPlain } from "class-transformer";
import { UpdateCustomerDto } from "../../dtos/update.customer.dto";
import { User } from "../../../../common/entities/user.entity";

export const cleanupCustomers = () => {
    return {
        type: Types.CLEANUP_CUSTOMERS,
        payload: {
            customer: undefined,
        },
    };
};

export const fetchCustomers = (page = 1, search = "") => {
    return {
        type: Types.FETCH_CUSTOMERS,
        payload: {
            request: {
                method: "GET",
                url:
                    `/customers?page=${page}` +
                    (search.length > 0 ? `&search=${search}` : ""),
            },
        },
    };
};

export const addCustomer = (customerDto: AddCustomerDto) => {
    console.log("customerData===", customerDto);
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
    console.log("updatecustomerData===", customerDto);
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
export const refreshCustomer = (user: User) => {
    return {
        type: Types.REFRESH_CUSTOMER,
        payload: {
            customer: user,
        },
    };
};
