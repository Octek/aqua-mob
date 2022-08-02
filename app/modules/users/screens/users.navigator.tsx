import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserListScreen } from "./user.list.screen";

const Stack = createStackNavigator();
export const UsersNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#cadcf0" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="userProfile"
                options={{ title: "Users", headerBackTitle: " " }}
                component={UserListScreen}
            />
        </Stack.Navigator>
    );
};
