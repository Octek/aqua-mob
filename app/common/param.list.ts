import { Company } from "./entities/company.entity";
import { Order } from "./entities/order.entity";
import { Product } from "./entities/product.entity";
import { User } from "./entities/user.entity";
import { PaymentItemDto } from "../modules/payments/dtos/payment.item.dto";

export type ParamList = {
    register: any;
    login: any;
    home: any;
    ordersNavigator: any;
    createPayments: any;
    productsNavigator: any;
    paymentsNavigator: any;
    selectProduct: any;
    addCompany: any;
    placeOrder: {
        customer?: User;
    };

    showOrder: {
        order: Order;
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
