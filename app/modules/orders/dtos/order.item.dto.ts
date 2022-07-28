import { Product } from "../../../common/entities/product.entity";

export enum OrderFilters {
    CancelledByUser = -2,
    CancelledByCompany,
    New,
    OnTheWay,
    Fulfilled,
}
export class OrderItemDto {
    constructor(
        public product: Product,
        public quantity: number,
        public price: number,
    ) {}

    toJson = () => {
        console.log("quantity:", this.quantity);
        return {
            productId: this.product.id,
            quantity: this.quantity,
            price: this.price,
        };
    };
}
