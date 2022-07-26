import { User } from "./user.entity";

export class Payment {
    constructor(
        public id: number,
        public amount: number,
        public mode: number,
        public isReversal: Boolean,
        public hasReversal: Boolean,
        public customer: User,
        public createdAt: Date,
    ) {}

    get formattedAmount(): string {
        return `Rs. ${this.amount}/-`;
    }
    badgeValue = (payment: Payment) => {
        if (payment.mode == 0) {
            return "Cash";
        } else if (payment.mode == 1) {
            return "Online";
        } else if (payment.isReversal || payment.isReversal) {
            return "Reversed";
        }
    };
}
