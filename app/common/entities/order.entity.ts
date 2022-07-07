import { User } from "./user.entity";
import { OrderItem } from "./order.item.entity";

export enum OrderStatus {
    CancelledByUser = -2,
    CancelledByCompany,
    New,
    Fulfilled,
}

export class Order {
    constructor(
        public customer: User,
        public items: OrderItem[],
        public status: OrderStatus,
    ) {}
}
