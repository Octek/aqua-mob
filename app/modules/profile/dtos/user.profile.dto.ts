export class UserProfileDto {
    constructor(
        public name: string,
        public password: string,
        public mobile: string,
        public email: string,
        public whatsApp: string,
        public role: number,
        public address: string,
    ) {}
}
