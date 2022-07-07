import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { HomeScreen } from "./home.screen";

const Stack = createStackNavigator();

export const HomeNavigator = (_: any) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#BCD979" },
                    headerTitle: () => (
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontFamily: "arial",
                                fontSize: 24,
                                color: "black",
                            }}
                        >
                            Enquiries
                        </Text>
                    ),
                    // headerLeft: () => DrawerButton(props.navigation),
                }}
                name="home"
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
};
