import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrdersListScreen } from "./orders.list.screen";
import { PlaceOrderScreen } from "./place.order.screen";
import { ProductsListScreen } from "../../products/screens/products.list.screen";
import { CustomersListScreen } from "../../customers/screens/customers.list.screen";
import { ShowOrderScreen } from "./show.order.screen";

const Stack = createStackNavigator();

export const OrdersNavigator = (_: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#cadcf0" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="orders"
                options={{ title: "Orders", headerBackTitle: " " }}
                component={OrdersListScreen}
            />
            <Stack.Screen
                name="placeOrder"
                options={{ title: "New Order", headerBackTitle: " " }}
                component={PlaceOrderScreen}
            />
            <Stack.Screen
                name="showOrder"
                options={{ title: "Order Details", headerBackTitle: " " }}
                component={ShowOrderScreen}
            />
            <Stack.Screen
                name="selectProduct"
                options={{
                    title: "Select",
                    headerBackTitle: " ",
                    presentation: "modal",
                }}
                component={ProductsListScreen}
            />
            <Stack.Screen
                name="selectCustomer"
                options={{
                    title: "Select",
                    headerBackTitle: " ",
                    presentation: "modal",
                }}
                component={CustomersListScreen}
            />
        </Stack.Navigator>
    );
};
