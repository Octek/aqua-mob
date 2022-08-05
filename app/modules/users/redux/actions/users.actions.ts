import * as Types from "../types/user.types";
import { instanceToPlain } from "class-transformer";
import { UsersDto } from "../../dtos/users.dto";

export const fetchUsers = () => {
    return {
        type: Types.GET_USERS,
        payload: {
            request: {
                method: "GET",
                url: "/users",
            },
        },
    };
};

export const addUser = (user: UsersDto) => {
    console.log("userDto===", user);
    return {
        type: Types.ADD_USER,
        payload: {
            request: {
                method: "POST",
                url: "/users",
                data: instanceToPlain(user),
            },
        },
    };
};

export const cleanupUsers = () => {
    return {
        type: Types.CLEANUP_USERS,
    };
};
