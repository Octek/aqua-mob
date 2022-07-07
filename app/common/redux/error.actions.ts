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
