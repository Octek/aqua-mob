export class Payment {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public amount: number,
        public mode: number,
    ) {}
}
