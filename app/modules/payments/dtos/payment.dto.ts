export enum PaymentMode {
    Cash,
    Online,
}
export enum filterSegment {
    Cash,
    Online,
    All,
}
export class PaymentDto {
    constructor(
        public amount: number,
        public mode: PaymentMode,
        public customerId: number,
    ) {}
}
