import * as Types from "../types/users.types";
import { instanceToPlain } from "class-transformer";
import { UsersDto } from "../../dtos/users.dto";
import { User } from "../../../../common/entities/user.entity";

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

export const updateUser = (user: UsersDto, userId: number) => {
    return {
        type: Types.UPDATE_USER,
        payload: {
            request: {
                method: "PUT",
                url: "/users/" + userId,
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

export const refreshUser = (user: User) => {
    return {
        type: Types.REFRESH_USER,
        payload: {
            user: user,
        },
    };
};
