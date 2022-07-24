import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    backgroundColor: string;
    title: string;
    subtitle: string;
    onPress: () => void;
};

export const MenuBox: React.FC<Props> = ({
    backgroundColor,
    title,
    subtitle,
    onPress,
}) => {
    return (
        <TouchableOpacity style={{ flex: 1, aspectRatio: 1 }} onPress={onPress}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    margin: 5,
                    flex: 1,
                    backgroundColor: `${backgroundColor}`,
                }}
            >
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
