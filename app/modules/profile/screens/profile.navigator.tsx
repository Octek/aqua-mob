import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfileScreen } from "./user.profile.screen";

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#cadcf0" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="showProfile"
                options={{ title: "User Profile", headerBackTitle: " " }}
                component={UserProfileScreen}
            />
        </Stack.Navigator>
    );
};
