import * as Types from "../types/user.types";

export const cleanupUser = () => {
    return {
        type: Types.CLEANUP_USER,
    };
};

export const blockUser = (userId: number) => {
    console.log("customerId===", userId);
    return {
        type: Types.BLOCK_USER,
        payload: {
            request: {
                method: "PATCH",
                url: `/users/${userId}/block`,
            },
        },
    };
};

export const unblockUser = (userId: number) => {
    return {
        type: Types.UNBLOCK_USER,
        payload: {
            request: {
                method: "PATCH",
                url: `/users/${userId}/unblock`,
            },
        },
    };
};
