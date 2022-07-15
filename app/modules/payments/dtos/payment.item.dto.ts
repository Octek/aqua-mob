export enum PaymentMode {
    Cash,
    Online,
}
export class PaymentItemDto {
    constructor(
        public amount: number,
        public mode: PaymentMode,
        public customerId: number,
    ) {}
}
