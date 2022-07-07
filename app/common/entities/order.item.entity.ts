import { Product } from "./product.entity";

export enum OrderStatus {
    CancelledByUser = -2,
    CancelledByCompany,
    New,
    Fulfilled,
}

export class OrderItem {
    constructor(
        public product: Product,
        public quantity: number,
        public price: number,
    ) {}
}
