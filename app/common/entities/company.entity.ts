export enum BusinessType {
    seller = "seller",
    buyer = "buyer",
}

export enum CompanyStatus {
    blocked = -1,
    active,
}

export class Company {
    constructor(
        public id: number,
        public businessType: BusinessType,
        public name: string,
        public status: CompanyStatus,
    ) {}

    get initials(): string {
        const components = this.name.split(" ");
        if (components.length === 1) {
            return this.name.substring(0, 2);
        } else if (components.length >= 2) {
            return components[0][0] + components[1][0];
        }
        return "";
    }
}
