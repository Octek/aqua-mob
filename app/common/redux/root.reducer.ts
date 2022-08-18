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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { customerReducer } from "../../modules/customers/redux/reducers/customer.reducer";
import { customerPaymentsReducer } from "../../modules/customers/redux/reducers/customer.payments.reducer";
import { customerOrdersReducer } from "../../modules/customers/redux/reducers/customer.orders.reducer";
import { usersReducer } from "../../modules/users/redux/reducers/users.reducer";
import { customerLedgerReducer } from "../../modules/customers/redux/reducers/customer.ledger.reducer";

const appReducer = combineReducers<ApplicationStateInterface>({
    authState: authReducer,
    ordersState: ordersReducer,
    orderState: orderReducer,
    customersState: customersReducer,
    customerState: customerReducer,
    customerOrdersState: customerOrdersReducer,
    customerPaymentsState: customerPaymentsReducer,
    usersState: usersReducer,
    paymentsState: paymentReducer,
    ledgerState: customerLedgerReducer,
    newPaymentState: newPaymentReducer,
    productsState: productsReducer,
    cartState: cartReducer,
    errorState: errorReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
    console.log("global state:", state);
    if (action.type === "LOGOUT") {
    } else if (
        action.type === "LOGOUT_SUCCESS" ||
        action.type === "LOGOUT_FAIL"
    ) {
        AsyncStorage.removeItem("persist:root");
        return appReducer(
            {
                ...state,
                authState: { ...state.authState, loggedInUser: undefined },
            },
            action,
        );
    }
    return appReducer(state, action);
};
