import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomersListScreen } from "./customers.list.screen";
import { UpsertCustomerScreen } from "./upsert.customer.screen";
import { ShowCustomerScreen } from "./show.customer.screen";
import { CustomerOrdersScreen } from "./customer.orders.screen";

const Stack = createStackNavigator();

export const CustomersNavigator = (_: any) => {
    return (
        <Stack.Navigator
            initialRouteName={"customers.list"}
            screenOptions={{
                headerStyle: { backgroundColor: "#BCD979" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="customers.list"
                options={{ title: "Customers", headerBackTitle: " " }}
                component={CustomersListScreen}
            />
            <Stack.Screen
                name="upsertCustomer"
                options={{ title: "Customers", headerBackTitle: " " }}
                component={UpsertCustomerScreen}
            />
            <Stack.Screen
                name="showCustomer"
                options={{ title: "Customer Details", headerBackTitle: " " }}
                component={ShowCustomerScreen}
            />
            <Stack.Screen
                name="customerOrders"
                options={{ title: "Customer Orders", headerBackTitle: " " }}
                component={CustomerOrdersScreen}
            />
        </Stack.Navigator>
    );
};
