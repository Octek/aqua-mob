export class UpdateCustomerDto {
    public constructor(
        public name: string,
        public mobile: string,
        public whatsApp: String,
        public email: String,
        public address: string,
    ) {}
}
