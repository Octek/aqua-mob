export class ProductDto {
    constructor(
        public name: string,
        public price: number,
        public isDefault = false,
    ) {}
}
