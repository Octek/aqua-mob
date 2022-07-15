import { AuthStateInterface } from "../../modules/auth/redux/reducers/auth.reducer";
import { ErrorStateInterface } from "./error.reducer";
import { MultipleEntitiesStateInterface } from "./entity.state.interface";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { CartItemInterface } from "../../modules/orders/redux/reducers/cart.reducer";
import { User } from "../entities/user.entity";
import { Payment } from "../entities/payment.entity";

export interface ApplicationStateInterface {
    authState: AuthStateInterface;
    ordersState: MultipleEntitiesStateInterface<Order>;
    customersState: MultipleEntitiesStateInterface<User>;
    paymentsState: MultipleEntitiesStateInterface<Payment>;
    productsState: MultipleEntitiesStateInterface<Product>;
    cartState: CartItemInterface;
    errorState: ErrorStateInterface;
}
