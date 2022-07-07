export interface ErrorStateInterface {
    code: number;
    message?: string;
}

const initialState: ErrorStateInterface = {
    code: 0,
    message: undefined,
};

export const errorReducer = (
    state = initialState,
    action: any,
): ErrorStateInterface => {
    switch (action.type) {
        case "ERROR":
            return { code: action.code, message: action.message };
        case "CLEAR_ERROR":
            return { code: 0, message: undefined };
        default:
            return state;
    }
};
