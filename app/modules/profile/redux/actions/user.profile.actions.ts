import * as Types from "../types/profile.types";
import { instanceToPlain } from "class-transformer";
import { UserProfileDto } from "../../dtos/user.profile.dto";

export const updateUserProfile = (
    profileDto: UserProfileDto,
    userId: number,
) => {
    console.log("user login data===", profileDto);
    return {
        type: Types.UPDATE_USER,
        payload: {
            request: {
                method: "PATCH",
                // url: `/users/${userId}`,
                url: "/profile",
                data: instanceToPlain(profileDto),
            },
        },
    };
};

export const cleanUserProfile = () => {
    return {
        type: Types.CLEAN_USER_PROFILE,
    };
};
