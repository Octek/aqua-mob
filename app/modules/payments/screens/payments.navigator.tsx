import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import { PaymentsListScreen } from "./payments.list.screen";
import { CreatePaymentScreen } from "./create.payment.screen";

const Stack = createStackNavigator();

export const PaymentNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#BCD979" },
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
        </Stack.Navigator>
    );
};
