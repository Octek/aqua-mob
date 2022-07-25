import { Company } from "./entities/company.entity";
import { Order } from "./entities/order.entity";
import { Product } from "./entities/product.entity";
import { User } from "./entities/user.entity";

export enum SelectCustomerReason {
    CreateOrder,
    CreatePayment,
}

export type ParamList = {
    register: any;
    login: any;
    home: any;
    ordersNavigator: any;
    createPayment: any;
    paymentsNavigator: any;
    productsNavigator: { selectable: boolean };
    selectProduct: { selectable: boolean };
    selectCustomer: { selectable: boolean; reason: SelectCustomerReason };
    addCompany: any;
    addPayment: any;
    placeOrder: {
        customer?: User;
    };
    showOrder: {
        order: Order;
        pushed: boolean;
    };
    showProduct: {
        product: Product;
    };
    upsertProduct: {
        product?: Product;
    };
    companyUsers: {
        company: Company;
    };
    customersNavigator: any;
    upsertCustomer: {
        customer?: User;
    };
    showCustomer: {
        customer: User;
    };
    customerOrders: {
        customer: User;
    };
};
