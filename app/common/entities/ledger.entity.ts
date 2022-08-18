export class LedgerItem {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public description: string,
        public debit: number,
        public credit: number,
        public balance: number,
    ) {}
}
