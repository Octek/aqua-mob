import { AuthStateInterface } from "../../modules/auth/redux/reducers/auth.reducer";
import { ErrorStateInterface } from "./error.reducer";
import { MultipleEntitiesStateInterface } from "./entity.state.interface";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { CartItemInterface } from "../../modules/orders/redux/reducers/cart.reducer";

export interface ApplicationStateInterface {
    authState: AuthStateInterface;
    ordersState: MultipleEntitiesStateInterface<Order>;
    productsState: MultipleEntitiesStateInterface<Product>;
    cartState: CartItemInterface;
    errorState: ErrorStateInterface;
}
