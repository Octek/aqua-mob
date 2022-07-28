import * as Types from "../../modules/auth/redux/types/auth.types";

export const showError = (code: number, message: string) => {
    return {
        type: "ERROR",
        code: code,
        message: message,
    };
};

export const clearError = () => {
    return {
        type: "CLEAR_ERROR",
    };
};

export const logout = () => {
    return {
        type: Types.LOGOUT,
        payload: {
            request: {
                method: "POST",
                url: "/auth/logout",
            },
        },
    };
};
