export class OrderItemDto {
    constructor(
        public productId: number,
        public quantity: number,
        public price: number,
    ) {}
}
