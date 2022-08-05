import { AuthStateInterface } from "../../modules/auth/redux/reducers/auth.reducer";
import { ErrorStateInterface } from "./error.reducer";
import {
    EntityStateInterface,
    MultipleEntitiesStateInterface,
} from "./entity.state.interface";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { CartItemInterface } from "../../modules/orders/redux/reducers/cart.reducer";
import { User } from "../entities/user.entity";
import { Payment } from "../entities/payment.entity";
import { NewPaymentInterface } from "../../modules/payments/redux/reducers/new.payment.reducer";

export interface ApplicationStateInterface {
    authState: AuthStateInterface;
    orderState: EntityStateInterface<Order>;
    ordersState: MultipleEntitiesStateInterface<Order>;
    customersState: MultipleEntitiesStateInterface<User>;
    customerState: EntityStateInterface<User>;
    customerOrdersState: MultipleEntitiesStateInterface<Order>;
    customerPaymentsState: MultipleEntitiesStateInterface<Payment>;
    paymentsState: MultipleEntitiesStateInterface<Payment>;
    newPaymentState: NewPaymentInterface;
    usersState: MultipleEntitiesStateInterface<User>;
    productsState: MultipleEntitiesStateInterface<Product>;
    cartState: CartItemInterface;
    errorState: ErrorStateInterface;
}
