import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserListScreen } from "./user.list.screen";
import { AddUserScreen } from "./add.user.screen";

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
                name="userList"
                options={{ title: "Users", headerBackTitle: " " }}
                component={UserListScreen}
            />

            <Stack.Screen
                name="addUser"
                options={{ title: "Users", headerBackTitle: " " }}
                component={AddUserScreen}
            />
        </Stack.Navigator>
    );
};
