import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import { PaymentsListScreen } from "./payments.list.screen";
import { CreatePaymentScreen } from "./create.payment.screen";
import { CustomersListScreen } from "../../customers/screens/customers.list.screen";
import { PaymentDetailScreen } from "./payment.detail.screen";

const Stack = createStackNavigator();

export const PaymentsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#cadcf0" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="Payments"
                options={{ title: "Payments", headerBackTitle: " " }}
                component={PaymentsListScreen}
            />
            <Stack.Screen
                name="addPayment"
                options={{ title: "Add Payment", headerBackTitle: " " }}
                component={CreatePaymentScreen}
            />
            <Stack.Screen
                name="showPaymentDetail"
                options={{ title: "Payment Details", headerBackTitle: " " }}
                component={PaymentDetailScreen}
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
