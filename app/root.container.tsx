import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState, StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "./common/redux/application.state.interface";
import { ActionState } from "./common/redux/entity.state.interface";
import { AuthNavigator } from "./modules/auth/screens/auth.navigator";
import { navigate, navigationRef, replace } from "./common/root.navigation";
import { showMessage } from "react-native-flash-message";
import { clearError } from "./common/redux/common.actions";
import { HomeNavigator } from "./modules/home/screens/home.navigator";
import { unauthorize } from "./modules/auth/redux/actions/auth.actions";
import { OrdersNavigator } from "./modules/orders/screens/orders.navigator";
import { PaymentsNavigator } from "./modules/payments/screens/payments.navigator";
import { CustomersNavigator } from "./modules/customers/screens/customers.navigator";
import { ProductsNavigator } from "./modules/products/screens/products.navigator";
import messaging from "@react-native-firebase/messaging";
import {
    cleanupOrderState,
    getOrderDetails,
} from "./modules/orders/redux/actions/order.actions";

export enum PushNotificationTypes {
    NewOrder = "NEW-ORDER",
}

enableScreens();

const Stack = createStackNavigator();

export const RootContainer = () => {
    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState);
    const [showing, setShowing] = React.useState<"home" | "login" | undefined>(
        undefined,
    );
    const authState = useSelector(
        (state: ApplicationStateInterface) => state.authState,
    );
    const orderState = useSelector(
        (state: ApplicationStateInterface) => state.orderState,
    );
    const errorState = useSelector(
        (state: ApplicationStateInterface) => state.errorState,
    );

    useEffect(() => {
        if (errorState.code === 401) {
            dispatch(unauthorize());
            if (showing !== "login") {
                replace("authNavigator", { screen: "login" });
            }
        }
        if (errorState.message) {
            showMessage({ message: errorState.message });
            dispatch(clearError());
        }
    }, [errorState.message]);

    useEffect(() => {
        if (authState.deviceState === ActionState.done) {
            if (authState.loggedInUser) {
                if (showing !== "home") {
                    replace("homeNavigator", { selectable: false });
                    setShowing("home");
                }
            } else {
                if (showing !== "login") {
                    replace("authNavigator", { screen: "login" });
                    setShowing("login");
                }
            }
        }
    }, [authState.deviceState, authState.authState, authState.loggedInUser]);

    useEffect(() => {
        return messaging().onMessage(async (message) => {
            console.log(message.data);
            if (message.data?.type === PushNotificationTypes.NewOrder) {
                dispatch(getOrderDetails(parseInt(message.data.orderId)));
            }
        });
    }, []);

    useEffect(() => {
        return messaging().onNotificationOpenedApp(async (message) => {
            console.log(message.data);
            if (message.data?.type === PushNotificationTypes.NewOrder) {
                dispatch(getOrderDetails(parseInt(message.data.orderId)));
            }
        });
    }, []);

    useEffect(() => {
        if (orderState.fetchState === ActionState.done) {
            dispatch(cleanupOrderState());
            navigate("ordersNavigator", {
                screen: "showOrder",
                params: { order: orderState.entity, pushed: true },
            });
        }
    }, [orderState.fetchState]);

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar translucent backgroundColor="transparent" />
            <Stack.Navigator
                initialRouteName={"authNavigator"}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="authNavigator" component={AuthNavigator} />
                <Stack.Screen name="homeNavigator" component={HomeNavigator} />
                <Stack.Screen
                    name="productsNavigator"
                    component={ProductsNavigator}
                />
                <Stack.Screen
                    name="ordersNavigator"
                    component={OrdersNavigator}
                />
                <Stack.Screen
                    name="paymentsNavigator"
                    component={PaymentsNavigator}
                />
                <Stack.Screen
                    name="customersNavigator"
                    component={CustomersNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
