import { AnyAction, combineReducers } from "redux";
import { ApplicationStateInterface } from "./application.state.interface";
import { authReducer } from "../../modules/auth/redux/reducers/auth.reducer";
import { errorReducer } from "./error.reducer";
import { ordersReducer } from "../../modules/orders/redux/reducers/orders.reducer";
import { productsReducer } from "../../modules/products/redux/reducers/products.reducer";
import { cartReducer } from "../../modules/orders/redux/reducers/cart.reducer";
import { customersReducer } from "../../modules/customers/redux/reducers/customers.reducer";
import { paymentReducer } from "../../modules/payments/redux/reducers/payments.reducer";
import { orderReducer } from "../../modules/orders/redux/reducers/order.reducer";
import { newPaymentReducer } from "../../modules/payments/redux/reducers/new.payment.reducer";

const appReducer = combineReducers<ApplicationStateInterface>({
    authState: authReducer,
    ordersState: ordersReducer,
    orderState: orderReducer,
    customersState: customersReducer,
    paymentsState: paymentReducer,
    paymetsState: newPaymentReducer,
    productsState: productsReducer,
    cartState: cartReducer,
    errorState: errorReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === "LOGOUT") {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
