import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OrdersListScreen } from "./orders.list.screen";
import { PlaceOrderScreen } from "./place.order.screen";
import { ProductsListScreen } from "../../products/screens/products.list.screen";

const Stack = createStackNavigator();

export const OrdersNavigator = (_: any) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#BCD979" },
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
                name="selectProduct"
                options={{
                    title: "Select",
                    headerBackTitle: " ",
                    presentation: "modal",
                }}
                component={ProductsListScreen}
            />
        </Stack.Navigator>
    );
};
