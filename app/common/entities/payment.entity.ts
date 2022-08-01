import { User } from "./user.entity";
import { OrderFilters } from "../../modules/orders/dtos/order.item.dto";
import { FilterSegment } from "../../modules/payments/dtos/payment.dto";

export class Payment {
    constructor(
        public id: number,
        public amount: number,
        public mode: number,
        public isReversal: Boolean,
        public hasReversal: Boolean,
        public customer: User,
        public createdAt: Date,
        public reverseReason: string,
    ) {}

    static buttonBackgroundColor = (status: number) => {
        if (status == FilterSegment.All) {
            return "#cadcf0";
        } else if (status == FilterSegment.Cash) {
            return "#3CCF4E";
        } else {
            return "#3AB4F2";
        }
    };
}
