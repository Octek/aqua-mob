import { User } from "./user.entity";

export class Payment {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public amount: number,
        public mode: number,
        public customer: User,
    ) {}

    get formattedAmount(): string {
        return `Rs. ${this.amount}/-`;
    }
}
