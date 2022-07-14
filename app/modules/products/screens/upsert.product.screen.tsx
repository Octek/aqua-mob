import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, View } from "react-native";
import { ListItem } from "react-native-elements";

type Props = {
    route: RouteProp<ParamList, "upsertProduct">;
    navigation: StackNavigationProp<ParamList, "upsertProduct">;
};

export const UpsertProductScreen: React.FC<Props> = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const rows = [
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Name"}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
                <ListItem.Subtitle>Name</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Price"}
                    value={name}
                    onChangeText={(value) => setPrice(value)}
                />
                <ListItem.Subtitle>Price</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
