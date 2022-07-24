import { DeviceDto, DeviceType } from "../../modules/auth/dtos/device.dto";
import {
    getManufacturer,
    getModel,
    getUniqueId,
    getVersion,
} from "react-native-device-info";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

export class Device {
    constructor(
        public id: number,
        public installationId: string,
        public type: DeviceType,
        public appVersion: string,
        public accessToken: string,
        public manufacturer?: string,
        public model?: string,
        public locale?: string,
        public fcmToken?: string,
    ) {}

    static toLatest = async (token?: string): Promise<DeviceDto> => {
        const manufacturer = await getManufacturer();
        return {
            installationId: getUniqueId(),
            type: Platform.OS === "ios" ? DeviceType.iOS : DeviceType.android,
            appVersion: getVersion(),
            manufacturer: manufacturer,
            model: getModel(),
            locale: "en-US",
            fcmToken: token,
        };
    };
}
