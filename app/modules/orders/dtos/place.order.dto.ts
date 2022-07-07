import { OrderItemDto } from "./order.item.dto";

export class PlaceOrderDto {
    constructor(public customerId: number, public items: OrderItemDto[]) {}
}
