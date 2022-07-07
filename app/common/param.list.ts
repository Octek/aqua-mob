import { Company } from "./entities/company.entity";
import { Order } from "./entities/order.entity";
import { Product } from "./entities/product.entity";

export type ParamList = {
    register: any;
    login: any;
    home: any;
    orders: any;
    products: any;
    selectProduct: any;
    addCompany: any;
    placeOrder: any;
    showOrder: {
        order: Order;
    };
    showProduct: {
        product: Product;
    };
    companyUsers: {
        company: Company;
    };
};
