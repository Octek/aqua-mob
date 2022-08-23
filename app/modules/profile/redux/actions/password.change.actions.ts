import * as Types from "../types/profile.types";
import { instanceToPlain } from "class-transformer";
import { ChangePasswordDto } from "../../dtos/change.password.dto";

export const changeUserPassword = (changePasswordDto: ChangePasswordDto) => {
    console.log("called or not changePasswordDto", changePasswordDto);
    return {
        type: Types.CHANGE_PASSWORD,
        payload: {
            request: {
                method: "PATCH",
                url: "/auth/password/change",
                data: instanceToPlain(changePasswordDto),
            },
        },
    };
};

export const clearChangePasswordState = () => {
    return {
        type: Types.CLEAR_CHANGE_PASSWORD,
    };
};
