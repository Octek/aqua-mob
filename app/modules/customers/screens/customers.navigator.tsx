import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CustomersListScreen } from "./customers.list.screen";
import { UpsertCustomerScreen } from "./upsert.customer.screen";
import { ShowCustomerScreen } from "./show.customer.screen";
import { CustomerOrdersScreen } from "./customer.orders.screen";
import { CustomerPaymentsScreen } from "./customer.payments.screen";

const Stack = createStackNavigator();

export const CustomersNavigator = (_: any) => {
    return (
        <Stack.Navigator
            initialRouteName={"customers.list"}
            screenOptions={{
                headerStyle: { backgroundColor: "#cadcf0" },
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
            <Stack.Screen
                name="customerPayments"
                options={{
                    headerBackTitle: " ",
                    title: "Customer Payments",
                }}
                component={CustomerPaymentsScreen}
            />
        </Stack.Navigator>
    );
};
