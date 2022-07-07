export enum DeviceType {
    web = 1,
    iOS,
    android,
}

export class DeviceDto {
    constructor(
        public installationId: string,
        public type: DeviceType,
        public appVersion: string,
        public manufacturer?: string,
        public model?: string,
        public locale?: string,
        public fcmToken?: string,
    ) {}
}
