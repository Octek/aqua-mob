export class UsersDto {
    constructor(
        public name: string,
        public username: string,
        public password: string,
        public mobile: string,
        public email: string,
        public whatsApp: string,
        public role: number,
        public address: string,
    ) {}
    static getUserRole = (role: number) => {
        if (role === UserRole.Admin) {
            return UserRole.Admin;
        } else {
            return UserRole.Operator;
        }
    };
}

export enum UserRole {
    Customer,
    Operator,
    Admin,
    SuperAdmin,
}
