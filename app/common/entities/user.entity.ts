import { Company } from "./company.entity";

export class User {
    constructor(
        public id: number,
        public username: string,
        public createdAt: string,
        public name: string,
        public email: string,
        public emailVerified: boolean,
        public mobile: string,
        public mobileVerified: boolean,
        public whatsApp: string,
        public whatsappVerified: boolean,
        public address: string,
        public status: number,
        public company: Company,
    ) {}

    get mobileWithoutPrefix(): string {
        return this.mobile.substring(3);
    }
    get whatsAppWithoutPrefix(): string {
        if (this.whatsApp != null) {
            return this.whatsApp.substring(3);
        } else {
            return "";
        }
    }

    get initials(): string {
        const components = this.name.split(" ");
        if (components.length === 1) {
            return this.name.substring(0, 2);
        } else if (components.length >= 2) {
            return components[0][0] + components[1][0];
        }
        return "";
    }
}
