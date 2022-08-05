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
}

export enum UserRoles {
    user,
    admin,
}
