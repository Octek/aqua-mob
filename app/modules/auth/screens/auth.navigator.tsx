import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./login.screen";
import { RegisterDeviceScreen } from "./register.device.screen";

const Stack = createStackNavigator();

export const AuthNavigator = (options: any) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="register" component={RegisterDeviceScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
    );
};
