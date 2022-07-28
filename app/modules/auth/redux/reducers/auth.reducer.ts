import { ActionState } from "../../../../common/redux/entity.state.interface";
import { User } from "../../../../common/entities/user.entity";
import * as Types from "../types/auth.types";
import { Device } from "../../../../common/entities/device.entity";

export interface AuthStateInterface {
    authState: ActionState;
    deviceState: ActionState;
    loggedInUser?: User;
    device?: Device;
}

const initialState: AuthStateInterface = {
    authState: ActionState.notStarted,
    deviceState: ActionState.notStarted,
    loggedInUser: undefined,
    device: undefined,
};

export const authReducer = (
    state = initialState,
    action: any,
): AuthStateInterface => {
    console.log(action.state);
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                authState: ActionState.inProgress,
            };
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                authState: ActionState.done,
                loggedInUser: action.payload.data,
            };
        case Types.LOGIN_FAIL:
            return {
                ...state,
                authState: ActionState.failed,
            };
        case Types.REGISTER_DEVICE:
            console.log("registering device ...");
            return {
                ...state,
                deviceState: ActionState.inProgress,
            };
        case Types.REGISTER_DEVICE_SUCCESS:
            console.log("success");
            return {
                ...state,
                deviceState: ActionState.done,
                device: action.payload.data,
            };
        case Types.REGISTER_DEVICE_FAIL:
            console.log("failed:", action.error);
            return {
                ...state,
                deviceState: ActionState.failed,
            };
        case Types.UNAUTHORIZE:
            return {
                ...state,
                loggedInUser: undefined,
            };
        default:
            return state;
    }
};
