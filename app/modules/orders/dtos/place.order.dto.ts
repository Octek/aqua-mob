import { OrderItemDto } from "./order.item.dto";

export class PlaceOrderDto {
    constructor(
        public customerId: number,
        public items: OrderItemDto[],
        public deliveryCharges: number,
    ) {}

    toJson = () => {
        return {
            customerId: this.customerId,
            items: this.items.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.price,
            })),
            deliveryCharges: this.deliveryCharges,
        };
    };
}
