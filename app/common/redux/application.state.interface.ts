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

export interface ApplicationStateInterface {
    authState: AuthStateInterface;
    orderState: EntityStateInterface<Order>;
    ordersState: MultipleEntitiesStateInterface<Order>;
    customersState: MultipleEntitiesStateInterface<User>;
    productsState: MultipleEntitiesStateInterface<Product>;
    cartState: CartItemInterface;
    errorState: ErrorStateInterface;
}
