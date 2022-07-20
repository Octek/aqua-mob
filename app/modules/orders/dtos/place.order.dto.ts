import { OrderItemDto } from "./order.item.dto";

export class PlaceOrderDto {
    constructor(public customerId: number, public items: OrderItemDto[]) {}

    toJson = () => {
        return {
            customerId: this.customerId,
            items: this.items.map((item) => item.toJson()),
        };
    };
}
