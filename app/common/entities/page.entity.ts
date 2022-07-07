export class Page {
    constructor(
        public currentPage: number,
        public itemsPerPage: number,
        public totalItems: number,
        public totalPages: number,
    ) {}
}
