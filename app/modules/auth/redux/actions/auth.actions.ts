import { LoginDto } from "../../dtos/login.dto";
import * as Types from "../types/auth.types";
import { instanceToPlain } from "class-transformer";
import { DeviceDto } from "../../dtos/device.dto";

export const registerDevice = (deviceDto: DeviceDto) => {
    console.log("here ...");
    return {
        type: Types.REGISTER_DEVICE,
        payload: {
            request: {
                method: "POST",
                url: "/auth/devices",
                data: instanceToPlain(deviceDto),
            },
        },
    };
};

export const login = (loginDto: LoginDto) => {
    return {
        type: Types.LOGIN,
        payload: {
            request: {
                method: "POST",
                url: "/auth/login",
                data: instanceToPlain(loginDto),
            },
        },
    };
};

export const unauthorize = () => {
    return {
        type: Types.UNAUTHORIZE,
    };
};
