import { DeviceDto, DeviceType } from "../../modules/auth/dtos/device.dto";
import {
    getManufacturer,
    getModel,
    getUniqueId,
    getVersion,
} from "react-native-device-info";
import { NativeModules, Platform } from "react-native";

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

    static toLatest = async (): Promise<DeviceDto> => {
        const manufacturer = await getManufacturer();
        return {
            installationId: getUniqueId(),
            type: Platform.OS === "ios" ? DeviceType.iOS : DeviceType.android,
            appVersion: getVersion(),
            manufacturer: manufacturer,
            model: getModel(),
            locale: "en-US",
        };
    };
}
