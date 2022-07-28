export enum PaymentMode {
    Cash,
    Online,
}
export enum FilterSegment {
    All = -1,
    Cash,
    Online,
}
export class PaymentDto {
    constructor(
        public amount: number,
        public mode: PaymentMode,
        public customerId: number,
    ) {}
}
