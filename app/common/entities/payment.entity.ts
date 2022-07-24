import { User } from "./user.entity";

export class Payment {
    constructor(
        public id: number,
        public amount: number,
        public mode: number,
        public customer: User,
        public createdAt: Date,
    ) {}

    get formattedAmount(): string {
        return `Rs. ${this.amount}/-`;
    }
}
