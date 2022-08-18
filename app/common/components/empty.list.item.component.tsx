import React from "react";
import { View, Text } from "react-native";

export const EmptyListItemComponent = () => {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#ddd",
            }}
        >
            <Text style={{ fontSize: 20 }}>NO ITEMS FOUND</Text>
        </View>
    );
};
