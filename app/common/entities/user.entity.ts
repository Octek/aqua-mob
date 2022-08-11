import { UserRole } from "../../modules/users/dtos/users.dto";

export type RoleColorType = {
    backgroundColor: string;
    text: string;
};
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
        public role: number,
        public status: number,
    ) {}

    get statusInfo(): RoleColorType {
        switch (this.role) {
            case UserRole.Customer:
                return {
                    backgroundColor: "#ffbf00",
                    text: "Customer",
                };
            case UserRole.Operator:
                return {
                    backgroundColor: "#B20600",
                    text: "Operator",
                };
            case UserRole.Admin:
                return {
                    backgroundColor: "#00092C",
                    text: "Admin",
                };
            case UserRole.SuperAdmin:
                return {
                    backgroundColor: "#ff69b4",
                    text: "Super Admin",
                };
            default:
                return {
                    backgroundColor: "black",
                    text: "unknown",
                };
        }
    }
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
