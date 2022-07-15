import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsListScreen } from "./products.list.screen";
import { UpsertProductScreen } from "./upsert.product.screen";

const Stack = createStackNavigator();

export const ProductsNavigator = (_: any) => {
    return (
        <Stack.Navigator
            initialRouteName={"products.list"}
            screenOptions={{
                headerStyle: { backgroundColor: "#BCD979" },
                headerTintColor: "black",
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="products.list"
                options={{ title: "Productss", headerBackTitle: " " }}
                component={ProductsListScreen}
            />
            <Stack.Screen
                name="upsertProduct"
                options={{ title: "Products", headerBackTitle: " " }}
                component={UpsertProductScreen}
            />
        </Stack.Navigator>
    );
};
