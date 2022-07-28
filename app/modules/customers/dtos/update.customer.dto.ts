export class UpdateCustomerDto {
    public constructor(
        public name: string,
        public mobile: string,
        public whatsApp: string,
        public email: string,
        public address: string,
    ) {}
}
